import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Eye, EyeOff, Heart, Mail, Lock, User, Phone, MapPin, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('patient');
  const { toast } = useToast();

  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    address: ''
  });

  const [doctorData, setDoctorData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    experience: '',
    qualification: '',
    registrationNumber: '',
    address: '',
    bio: ''
  });

  const handlePatientInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value
    });
  };

  const handleDoctorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration Successful!",
        description: `Welcome to FreeDoctor! Your ${activeTab} account has been created.`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Join FreeDoctor</h1>
            <p className="text-muted-foreground">
              Create your account to access medical camps and connect with healthcare professionals.
            </p>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create Account</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="patient" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Patient
                  </TabsTrigger>
                  <TabsTrigger value="doctor" className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Doctor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="patient">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-name"
                            name="name"
                            placeholder="Enter your full name"
                            value={patientData.name}
                            onChange={handlePatientInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={patientData.email}
                            onChange={handlePatientInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={patientData.phone}
                            onChange={handlePatientInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-age">Age</Label>
                        <Input
                          id="patient-age"
                          name="age"
                          type="number"
                          placeholder="Enter your age"
                          value={patientData.age}
                          onChange={handlePatientInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-gender">Gender</Label>
                        <Select value={patientData.gender} onValueChange={(value) => setPatientData({...patientData, gender: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patient-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="patient-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={patientData.password}
                            onChange={handlePatientInputChange}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="patient-address">Address</Label>
                      <Textarea
                        id="patient-address"
                        name="address"
                        placeholder="Enter your complete address"
                        value={patientData.address}
                        onChange={handlePatientInputChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating Account..." : "Create Patient Account"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="doctor">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="doctor-name"
                            name="name"
                            placeholder="Dr. Your Name"
                            value={doctorData.name}
                            onChange={handleDoctorInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctor-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="doctor-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={doctorData.email}
                            onChange={handleDoctorInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctor-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="doctor-phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={doctorData.phone}
                            onChange={handleDoctorInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctor-specialization">Specialization</Label>
                        <Select value={doctorData.specialization} onValueChange={(value) => setDoctorData({...doctorData, specialization: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general-physician">General Physician</SelectItem>
                            <SelectItem value="cardiologist">Cardiologist</SelectItem>
                            <SelectItem value="endocrinologist">Endocrinologist</SelectItem>
                            <SelectItem value="ophthalmologist">Ophthalmologist</SelectItem>
                            <SelectItem value="orthopedist">Orthopedist</SelectItem>
                            <SelectItem value="dermatologist">Dermatologist</SelectItem>
                            <SelectItem value="neurologist">Neurologist</SelectItem>
                            <SelectItem value="gynecologist">Gynecologist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctor-experience">Experience (Years)</Label>
                        <Input
                          id="doctor-experience"
                          name="experience"
                          type="number"
                          placeholder="Years of experience"
                          value={doctorData.experience}
                          onChange={handleDoctorInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="doctor-qualification">Qualification</Label>
                        <Input
                          id="doctor-qualification"
                          name="qualification"
                          placeholder="MBBS, MD, etc."
                          value={doctorData.qualification}
                          onChange={handleDoctorInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="doctor-registration">Medical Registration Number</Label>
                        <Input
                          id="doctor-registration"
                          name="registrationNumber"
                          placeholder="Enter your medical registration number"
                          value={doctorData.registrationNumber}
                          onChange={handleDoctorInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="doctor-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="doctor-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={doctorData.password}
                            onChange={handleDoctorInputChange}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor-address">Clinic/Hospital Address</Label>
                      <Textarea
                        id="doctor-address"
                        name="address"
                        placeholder="Enter your clinic or hospital address"
                        value={doctorData.address}
                        onChange={handleDoctorInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="doctor-bio">Professional Bio</Label>
                      <Textarea
                        id="doctor-bio"
                        name="bio"
                        placeholder="Brief description about yourself and your practice"
                        value={doctorData.bio}
                        onChange={handleDoctorInputChange}
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating Account..." : "Create Doctor Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}