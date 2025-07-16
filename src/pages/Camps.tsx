import { useState } from 'react';
import { Header } from '@/components/Header';
import { CampCard } from '@/components/CampCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCamps } from '@/hooks/useCamps';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Heart,
  IndianRupee
} from 'lucide-react';

export default function Camps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  
  const { camps, loading, registerForCamp } = useCamps();

  const handleRegister = async (campId: string) => {
    const result = await registerForCamp(campId);
    if (result.success && result.requiresPayment) {
      // TODO: Implement Razorpay payment integration
      console.log('Payment required for amount:', result.amount);
    }
  };

  // Filter camps based on search and filters
  const filteredCamps = camps.filter(camp => {
    const matchesSearch = camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (camp.doctor_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         camp.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = !selectedCity || camp.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesType = !selectedType || camp.camp_type === selectedType;
    const matchesSpecialization = !selectedSpecialization || camp.specialization === selectedSpecialization;

    return matchesSearch && matchesCity && matchesType && matchesSpecialization;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-medical to-accent bg-clip-text text-transparent">
            Find Medical Camps
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover verified medical camps in your area. Connect with qualified healthcare professionals 
            and access quality medical services at affordable prices or for free.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-primary/5 via-medical/5 to-accent/5 rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search camps, doctors, specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg bg-background/80 backdrop-blur border-border/50 focus:border-primary/50 rounded-xl"
                />
              </div>
            </div>

            {/* City Filter */}
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="h-12 rounded-xl bg-background/80 backdrop-blur border-border/50">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select City" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="kolkata">Kolkata</SelectItem>
                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-12 rounded-xl bg-background/80 backdrop-blur border-border/50">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Camp Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="free">Free Camps</SelectItem>
                <SelectItem value="paid">Paid Camps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Specialization Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="h-12 rounded-xl bg-background/80 backdrop-blur border-border/50">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select Specialization" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specializations</SelectItem>
                <SelectItem value="General Physician">General Physician</SelectItem>
                <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                <SelectItem value="Endocrinologist">Endocrinologist</SelectItem>
                <SelectItem value="Ophthalmologist">Ophthalmologist</SelectItem>
                <SelectItem value="Orthopedist">Orthopedist</SelectItem>
                <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                <SelectItem value="Neurologist">Neurologist</SelectItem>
                <SelectItem value="Gynecologist">Gynecologist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCity || selectedType || selectedSpecialization) && (
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('');
                  setSelectedType('');
                  setSelectedSpecialization('');
                }}
                className="rounded-xl"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Medical Camps ({filteredCamps.length})
            </h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                <Heart className="h-3 w-3 mr-1" />
                {filteredCamps.filter(camp => camp.camp_type === 'free').length} Free Camps
              </Badge>
              <Badge variant="outline" className="bg-warning/10 text-warning">
                <IndianRupee className="h-3 w-3 mr-1" />
                {filteredCamps.filter(camp => camp.camp_type === 'paid').length} Paid Camps
              </Badge>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-muted rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCamps.map((camp) => {
                const transformedCamp = {
                  id: camp.id,
                  title: camp.title,
                  description: camp.description,
                  doctor: camp.doctor_name || 'Unknown Doctor',
                  specialization: camp.specialization,
                  date: camp.date,
                  time: `${camp.start_time} - ${camp.end_time}`,
                  location: `${camp.location}, ${camp.city}`,
                  capacity: camp.capacity,
                  registered: camp.registered_count,
                  price: camp.price,
                  status: camp.status === 'approved' ? 'upcoming' as const : camp.status as 'upcoming' | 'ongoing' | 'completed',
                  type: camp.camp_type
                };

                return (
                  <CampCard
                    key={camp.id}
                    camp={transformedCamp}
                    onRegister={handleRegister}
                  />
                );
              })}
            </div>
          )}

          {!loading && filteredCamps.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No camps found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters to find more camps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}