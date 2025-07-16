import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Camp {
  id: string;
  title: string;
  description: string;
  doctor_name?: string;
  specialization: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  address: string;
  city: string;
  capacity: number;
  registered_count: number;
  price: number;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed';
  camp_type: 'free' | 'paid';
  created_at: string;
  doctor_profiles?: {
    user_id: string;
    specialization: string;
    profiles: {
      full_name: string;
    };
  };
}

export function useCamps() {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCamps = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('medical_camps')
        .select(`
          *,
          doctor_profiles (
            user_id,
            specialization,
            profiles (
              full_name
            )
          )
        `)
        .eq('status', 'approved')
        .order('date', { ascending: true });

      if (error) throw error;

      const transformedCamps = data?.map(camp => ({
        ...camp,
        doctor_name: camp.doctor_profiles?.profiles?.full_name || 'Unknown Doctor',
        time: `${camp.start_time} - ${camp.end_time}`,
        status: camp.status as 'pending' | 'approved' | 'rejected' | 'cancelled' | 'completed',
        camp_type: camp.camp_type as 'free' | 'paid'
      })) || [];

      setCamps(transformedCamps);
    } catch (error: any) {
      console.error('Error fetching camps:', error);
      toast({
        title: "Error",
        description: "Failed to load medical camps.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const registerForCamp = async (campId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to register for camps.",
        variant: "destructive"
      });
      return { success: false };
    }

    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;

      // Get camp details
      const { data: camp, error: campError } = await supabase
        .from('medical_camps')
        .select('*')
        .eq('id', campId)
        .single();

      if (campError) throw campError;

      // Check if already registered
      const { data: existingRegistration, error: checkError } = await supabase
        .from('camp_registrations')
        .select('id')
        .eq('camp_id', campId)
        .eq('user_id', user.id)
        .single();

      if (existingRegistration) {
        toast({
          title: "Already registered",
          description: "You are already registered for this camp.",
          variant: "destructive"
        });
        return { success: false };
      }

      // Register for camp
      const { error: registerError } = await supabase
        .from('camp_registrations')
        .insert({
          camp_id: campId,
          user_id: user.id,
          profile_id: profile.id,
          amount_paid: camp.price,
          payment_status: camp.camp_type === 'free' ? 'completed' : 'pending'
        });

      if (registerError) throw registerError;

      toast({
        title: "Registration successful!",
        description: camp.camp_type === 'free' 
          ? "You have been registered for this free camp."
          : "Please complete payment to confirm your registration."
      });

      // Refresh camps to update registration count
      fetchCamps();

      return { success: true, requiresPayment: camp.camp_type === 'paid', amount: camp.price };

    } catch (error: any) {
      console.error('Error registering for camp:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Failed to register for camp.",
        variant: "destructive"
      });
      return { success: false };
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  return {
    camps,
    loading,
    fetchCamps,
    registerForCamp
  };
}