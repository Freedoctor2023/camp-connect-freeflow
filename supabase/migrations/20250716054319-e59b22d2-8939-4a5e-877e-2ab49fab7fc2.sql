-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  avatar_url TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('patient', 'doctor', 'admin')) DEFAULT 'patient',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doctor_profiles table for doctor-specific information
CREATE TABLE public.doctor_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  medical_license TEXT NOT NULL,
  specialization TEXT NOT NULL,
  qualification TEXT NOT NULL,
  experience_years INTEGER DEFAULT 0,
  consultation_fee DECIMAL(10,2) DEFAULT 0,
  bio TEXT,
  clinic_name TEXT,
  clinic_address TEXT,
  is_approved BOOLEAN DEFAULT false,
  approval_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medical_camps table
CREATE TABLE public.medical_camps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  doctor_id UUID NOT NULL REFERENCES public.doctor_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  specialization TEXT NOT NULL,
  camp_type TEXT NOT NULL CHECK (camp_type IN ('free', 'paid')),
  price DECIMAL(10,2) DEFAULT 0,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  registered_count INTEGER DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled', 'completed')) DEFAULT 'pending',
  approval_date TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create camp_registrations table
CREATE TABLE public.camp_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  camp_id UUID NOT NULL REFERENCES public.medical_camps(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
  payment_id TEXT,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  attendance_status TEXT CHECK (attendance_status IN ('registered', 'attended', 'absent')) DEFAULT 'registered',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(camp_id, user_id)
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID NOT NULL REFERENCES public.camp_registrations(id) ON DELETE CASCADE,
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  doctor_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('camp_approval', 'camp_registration', 'payment_success', 'payment_failed', 'camp_reminder', 'general')),
  is_read BOOLEAN DEFAULT false,
  camp_id UUID REFERENCES public.medical_camps(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camp_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for doctor_profiles
CREATE POLICY "Anyone can view approved doctors" ON public.doctor_profiles FOR SELECT USING (is_approved = true);
CREATE POLICY "Doctors can view their own profile" ON public.doctor_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Doctors can update their own profile" ON public.doctor_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Doctors can insert their own profile" ON public.doctor_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for medical_camps
CREATE POLICY "Anyone can view approved camps" ON public.medical_camps FOR SELECT USING (status = 'approved');
CREATE POLICY "Doctors can view their own camps" ON public.medical_camps FOR SELECT USING (doctor_id IN (SELECT id FROM public.doctor_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Doctors can create camps" ON public.medical_camps FOR INSERT WITH CHECK (doctor_id IN (SELECT id FROM public.doctor_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Doctors can update their own camps" ON public.medical_camps FOR UPDATE USING (doctor_id IN (SELECT id FROM public.doctor_profiles WHERE user_id = auth.uid()));

-- RLS Policies for camp_registrations
CREATE POLICY "Users can view their own registrations" ON public.camp_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Doctors can view registrations for their camps" ON public.camp_registrations FOR SELECT USING (camp_id IN (SELECT id FROM public.medical_camps WHERE doctor_id IN (SELECT id FROM public.doctor_profiles WHERE user_id = auth.uid())));
CREATE POLICY "Users can register for camps" ON public.camp_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own registrations" ON public.camp_registrations FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (registration_id IN (SELECT id FROM public.camp_registrations WHERE user_id = auth.uid()));
CREATE POLICY "Doctors can view payments for their camps" ON public.payments FOR SELECT USING (registration_id IN (SELECT id FROM public.camp_registrations WHERE camp_id IN (SELECT id FROM public.medical_camps WHERE doctor_id IN (SELECT id FROM public.doctor_profiles WHERE user_id = auth.uid()))));

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_doctor_profiles_updated_at BEFORE UPDATE ON public.doctor_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medical_camps_updated_at BEFORE UPDATE ON public.medical_camps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_camp_registrations_updated_at BEFORE UPDATE ON public.camp_registrations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update camp registration count
CREATE OR REPLACE FUNCTION public.update_camp_registration_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.medical_camps 
        SET registered_count = registered_count + 1 
        WHERE id = NEW.camp_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.medical_camps 
        SET registered_count = registered_count - 1 
        WHERE id = OLD.camp_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for camp registration count
CREATE TRIGGER update_camp_registration_count_trigger
    AFTER INSERT OR DELETE ON public.camp_registrations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_camp_registration_count();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_doctor_profiles_user_id ON public.doctor_profiles(user_id);
CREATE INDEX idx_medical_camps_doctor_id ON public.medical_camps(doctor_id);
CREATE INDEX idx_medical_camps_status ON public.medical_camps(status);
CREATE INDEX idx_medical_camps_date ON public.medical_camps(date);
CREATE INDEX idx_camp_registrations_camp_id ON public.camp_registrations(camp_id);
CREATE INDEX idx_camp_registrations_user_id ON public.camp_registrations(user_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);