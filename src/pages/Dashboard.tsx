import { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Eye, 
  Edit,
  Plus,
  Clock,
  MapPin,
  Stethoscope
} from 'lucide-react';

// Mock data for doctor dashboard
const dashboardStats = [
  { 
    title: 'Total Camps Created', 
    value: 12, 
    change: '+3 this month',
    icon: Calendar,
    color: 'text-primary'
  },
  { 
    title: 'Total Registrations', 
    value: 456, 
    change: '+89 this week',
    icon: Users,
    color: 'text-medical'
  },
  { 
    title: 'Revenue Earned', 
    value: '₹45,600', 
    change: '+12% from last month',
    icon: IndianRupee,
    color: 'text-success'
  },
  { 
    title: 'Active Camps', 
    value: 3, 
    change: '2 upcoming',
    icon: TrendingUp,
    color: 'text-accent'
  }
];

const recentCamps = [
  {
    id: '1',
    title: 'Free Diabetes Screening Camp',
    date: '2024-01-20',
    location: 'Community Health Center, Mumbai',
    registered: 67,
    capacity: 100,
    status: 'upcoming',
    type: 'free',
    revenue: 0
  },
  {
    id: '2',
    title: 'Cardiology Health Camp',
    date: '2024-01-22',
    location: 'City Hospital, Delhi',
    registered: 23,
    capacity: 50,
    status: 'upcoming',
    type: 'paid',
    revenue: 11500
  },
  {
    id: '3',
    title: 'Eye Care Camp',
    date: '2024-01-15',
    location: 'Vision Care Center, Bangalore',
    registered: 45,
    capacity: 80,
    status: 'completed',
    type: 'free',
    revenue: 0
  }
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-primary/10 text-primary';
      case 'ongoing': return 'bg-success/10 text-success';
      case 'completed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'free' 
      ? 'bg-success/10 text-success' 
      : 'bg-warning/10 text-warning';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Dr. Priya Sharma. Manage your medical camps and track your impact.
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Create New Camp
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="camps">My Camps</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">
                          {stat.change}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl bg-background shadow-sm ${stat.color}`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Camps */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Recent Medical Camps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCamps.map((camp) => (
                    <div key={camp.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{camp.title}</h3>
                          <Badge className={getStatusColor(camp.status)}>
                            {camp.status}
                          </Badge>
                          <Badge className={getTypeColor(camp.type)}>
                            {camp.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {camp.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {camp.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {camp.registered}/{camp.capacity}
                          </div>
                          {camp.type === 'paid' && (
                            <div className="flex items-center gap-1">
                              <IndianRupee className="h-3 w-3" />
                              ₹{camp.revenue}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="camps" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>All Medical Camps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Manage Your Camps</h3>
                  <p className="text-muted-foreground mb-4">
                    View, edit, and manage all your medical camps in one place.
                  </p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Camp
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Patient Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Registration Management</h3>
                  <p className="text-muted-foreground">
                    Track and manage patient registrations for your medical camps.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Analytics & Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Performance Analytics</h3>
                  <p className="text-muted-foreground">
                    Detailed insights about your camps' performance and patient engagement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}