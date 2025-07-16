import { useState } from 'react';
import { Header } from '@/components/Header';
import { CampCard } from '@/components/CampCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  IndianRupee,
  Clock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for all camps
const allCamps = [
  {
    id: '1',
    title: 'Free Diabetes Screening Camp',
    description: 'Comprehensive diabetes screening including blood sugar tests and consultation.',
    doctor: 'Priya Sharma',
    specialization: 'Endocrinologist',
    date: '2024-01-20',
    time: '9:00 AM - 2:00 PM',
    location: 'Community Health Center, Mumbai',
    capacity: 100,
    registered: 67,
    price: 0,
    status: 'upcoming' as const,
    type: 'free' as const,
  },
  {
    id: '2',
    title: 'Cardiology Health Camp',
    description: 'Heart health checkups with ECG and consultation with cardiologist.',
    doctor: 'Rajesh Kumar',
    specialization: 'Cardiologist',
    date: '2024-01-22',
    time: '10:00 AM - 4:00 PM',
    location: 'City Hospital, Delhi',
    capacity: 50,
    registered: 23,
    price: 500,
    status: 'upcoming' as const,
    type: 'paid' as const,
  },
  {
    id: '3',
    title: 'Eye Care Camp',
    description: 'Free eye examination and vision testing for all ages.',
    doctor: 'Amit Patel',
    specialization: 'Ophthalmologist',
    date: '2024-01-25',
    time: '8:00 AM - 12:00 PM',
    location: 'Vision Care Center, Bangalore',
    capacity: 80,
    registered: 42,
    price: 0,
    status: 'upcoming' as const,
    type: 'free' as const,
  },
  {
    id: '4',
    title: 'Orthopedic Consultation Camp',
    description: 'Bone and joint health checkups with orthopedic specialists.',
    doctor: 'Sunita Reddy',
    specialization: 'Orthopedist',
    date: '2024-01-28',
    time: '11:00 AM - 5:00 PM',
    location: 'Bone Care Clinic, Chennai',
    capacity: 40,
    registered: 15,
    price: 750,
    status: 'upcoming' as const,
    type: 'paid' as const,
  },
  {
    id: '5',
    title: 'General Health Screening',
    description: 'Complete health checkup including blood tests and physical examination.',
    doctor: 'Vikram Singh',
    specialization: 'General Physician',
    date: '2024-02-01',
    time: '9:00 AM - 3:00 PM',
    location: 'Primary Health Center, Pune',
    capacity: 120,
    registered: 89,
    price: 0,
    status: 'upcoming' as const,
    type: 'free' as const,
  },
  {
    id: '6',
    title: 'Dermatology Camp',
    description: 'Skin health consultation and treatment advice.',
    doctor: 'Meera Joshi',
    specialization: 'Dermatologist',
    date: '2024-02-03',
    time: '10:00 AM - 2:00 PM',
    location: 'Skin Care Center, Hyderabad',
    capacity: 60,
    registered: 34,
    price: 400,
    status: 'upcoming' as const,
    type: 'paid' as const,
  }
];

export default function Camps() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [filteredCamps, setFilteredCamps] = useState(allCamps);

  const handleSearch = () => {
    let filtered = allCamps;

    if (searchQuery) {
      filtered = filtered.filter(camp => 
        camp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camp.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(camp => 
        camp.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(camp => camp.type === typeFilter);
    }

    if (specializationFilter) {
      filtered = filtered.filter(camp => 
        camp.specialization.toLowerCase() === specializationFilter.toLowerCase()
      );
    }

    setFilteredCamps(filtered);
  };

  const handleRegister = (campId: string) => {
    console.log('Registering for camp:', campId);
    // Registration logic will be implemented with backend
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationFilter('');
    setTypeFilter('');
    setSpecializationFilter('');
    setFilteredCamps(allCamps);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold">Find Medical Camps</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and register for medical camps near you. Connect with verified healthcare professionals 
            and access quality healthcare services.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-muted/30 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search camps, doctors, specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi</SelectItem>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free Camps</SelectItem>
                <SelectItem value="paid">Paid Camps</SelectItem>
              </SelectContent>
            </Select>

            {/* Specialization Filter */}
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general physician">General Physician</SelectItem>
                <SelectItem value="cardiologist">Cardiologist</SelectItem>
                <SelectItem value="endocrinologist">Endocrinologist</SelectItem>
                <SelectItem value="ophthalmologist">Ophthalmologist</SelectItem>
                <SelectItem value="orthopedist">Orthopedist</SelectItem>
                <SelectItem value="dermatologist">Dermatologist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search Camps
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">
              {filteredCamps.length} Medical Camps Found
            </h2>
            <div className="flex gap-2">
              <Badge variant="outline">
                {filteredCamps.filter(camp => camp.type === 'free').length} Free
              </Badge>
              <Badge variant="outline">
                {filteredCamps.filter(camp => camp.type === 'paid').length} Paid
              </Badge>
            </div>
          </div>
        </div>

        {/* Camps Grid */}
        {filteredCamps.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCamps.map((camp) => (
              <CampCard 
                key={camp.id} 
                camp={camp} 
                onRegister={handleRegister} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No camps found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more camps.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredCamps.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Camps
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}