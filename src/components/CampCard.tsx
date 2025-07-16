import { Calendar, MapPin, Users, IndianRupee, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CampCardProps {
  camp: {
    id: string;
    title: string;
    description: string;
    doctor: string;
    specialization: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    registered: number;
    price: number;
    status: 'upcoming' | 'ongoing' | 'completed';
    type: 'free' | 'paid';
  };
  onRegister?: (campId: string) => void;
}

export function CampCard({ camp, onRegister }: CampCardProps) {
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
      ? 'bg-success/10 text-success border-success/20' 
      : 'bg-warning/10 text-warning border-warning/20';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-primary/20">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {camp.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Dr. {camp.doctor} • {camp.specialization}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Badge variant="outline" className={getStatusColor(camp.status)}>
              {camp.status}
            </Badge>
            <Badge variant="outline" className={getTypeColor(camp.type)}>
              {camp.type}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {camp.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{camp.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{camp.time}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{camp.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {camp.registered}/{camp.capacity} registered
            </span>
          </div>
          {camp.type === 'paid' && (
            <div className="flex items-center gap-1 font-semibold text-medical">
              <IndianRupee className="h-4 w-4" />
              {camp.price}
            </div>
          )}
        </div>

        {/* Progress bar for capacity */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(camp.registered / camp.capacity) * 100}%` }}
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={() => onRegister?.(camp.id)}
          disabled={camp.registered >= camp.capacity || camp.status === 'completed'}
          variant={camp.registered >= camp.capacity ? "secondary" : "default"}
        >
          {camp.registered >= camp.capacity
            ? 'Fully Booked'
            : camp.status === 'completed'
            ? 'Completed'
            : camp.type === 'free'
            ? 'Register for Free'
            : `Register for ₹${camp.price}`
          }
        </Button>
      </CardFooter>
    </Card>
  );
}