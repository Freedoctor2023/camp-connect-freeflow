import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CampCard } from '@/components/CampCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Heart, 
  Users, 
  Calendar, 
  MapPin, 
  Star,
  ArrowRight,
  Stethoscope,
  Shield,
  Clock
} from 'lucide-react';

// Mock data - will be replaced with real data from backend
const featuredCamps = [
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
  }
];

const stats = [
  { icon: Users, label: 'Registered Users', value: '10,000+', color: 'text-primary' },
  { icon: Stethoscope, label: 'Medical Camps', value: '500+', color: 'text-medical' },
  { icon: Heart, label: 'Lives Impacted', value: '25,000+', color: 'text-success' },
  { icon: Shield, label: 'Verified Doctors', value: '200+', color: 'text-accent' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegister = (campId: string) => {
    // This will be implemented with real registration logic
    console.log('Registering for camp:', campId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Heart className="h-3 w-3 mr-1" />
                Healthcare for Everyone
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-medical to-accent bg-clip-text text-transparent leading-tight">
                Connect with 
                <br />
                Medical Camps
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Find and join medical camps near you. Get quality healthcare services 
                from verified doctors, participate in free health screenings, or access 
                specialized treatments.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for medical camps, doctors, or specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-background/80 backdrop-blur border-border/50 focus:border-primary/50 rounded-xl"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-xl shadow-lg hover:shadow-xl transition-shadow" asChild>
                <Link to="/camps">
                  <Calendar className="mr-2 h-5 w-5" />
                  Find Medical Camps
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl" asChild>
                <Link to="/register">
                  <Users className="mr-2 h-5 w-5" />
                  Join as Doctor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className={`mx-auto w-12 h-12 rounded-xl bg-background shadow-sm flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Camps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Medical Camps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover upcoming medical camps and health screening programs conducted by verified healthcare professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredCamps.map((camp) => (
              <CampCard key={camp.id} camp={camp} onRegister={handleRegister} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" size="lg" className="rounded-xl" asChild>
              <Link to="/camps">
                View All Camps
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How FreeDoctor Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to connect with quality healthcare services in your community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Discover Camps</h3>
              <p className="text-muted-foreground">
                Browse through verified medical camps and health programs in your area.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-medical/10 text-medical flex items-center justify-center">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Book Appointment</h3>
              <p className="text-muted-foreground">
                Register for free camps or book paid consultations with specialists.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Get Healthcare</h3>
              <p className="text-muted-foreground">
                Attend the camp and receive quality healthcare services from verified doctors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/5 via-medical/5 to-accent/5 rounded-3xl p-8 md:p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Are you a Doctor?</h2>
                <p className="text-muted-foreground text-lg">
                  Join our platform to organize medical camps, reach more patients, 
                  and make healthcare accessible to communities that need it most.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-xl shadow-lg hover:shadow-xl transition-shadow" asChild>
                  <Link to="/doctor-register">
                    <Stethoscope className="mr-2 h-5 w-5" />
                    Register as Doctor
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl" asChild>
                  <Link to="/create-camp">
                    <Calendar className="mr-2 h-5 w-5" />
                    Create Medical Camp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/lovable-uploads/d9b5f805-77d3-463e-86b6-ebbbcc63799a.png" 
                  alt="FreeDoctor Logo" 
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  FreeDoctor
                </span>
              </div>
              <p className="text-muted-foreground">
                Making healthcare accessible to everyone through community medical camps and verified healthcare professionals.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">For Patients</h4>
              <div className="space-y-2 text-sm">
                <Link to="/camps" className="block text-muted-foreground hover:text-primary transition-colors">
                  Find Medical Camps
                </Link>
                <Link to="/register" className="block text-muted-foreground hover:text-primary transition-colors">
                  Register Account
                </Link>
                <Link to="/how-it-works" className="block text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">For Doctors</h4>
              <div className="space-y-2 text-sm">
                <Link to="/doctor-register" className="block text-muted-foreground hover:text-primary transition-colors">
                  Join as Doctor
                </Link>
                <Link to="/create-camp" className="block text-muted-foreground hover:text-primary transition-colors">
                  Create Medical Camp
                </Link>
                <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors">
                  Doctor Dashboard
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 FreeDoctor. All rights reserved. Made with ❤️ for better healthcare access.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}