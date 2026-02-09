import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { 
  Heart, 
  Wind, 
  MessageSquare, 
  Users, 
  Calendar, 
  Brain,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { AppPage } from '../App';

interface DashboardPageProps {
  onNavigate: (page: AppPage) => void;
}

const dashboardCards = [
  {
    id: 'guidedMeditation',
    title: 'Guided Meditation',
    description: '3-minute reset for doctors',
    icon: Sparkles,
    gradient: 'from-purple-500/10 to-purple-500/5',
    iconColor: 'text-purple-500',
    page: 'guidedMeditation' as AppPage,
  },
  {
    id: 'breathing',
    title: 'Breathing Reset',
    description: 'Quick breathing exercises',
    icon: Wind,
    gradient: 'from-blue-500/10 to-blue-500/5',
    iconColor: 'text-blue-500',
    page: 'breathing' as AppPage,
  },
  {
    id: 'vent',
    title: 'Vent Room',
    description: 'Anonymous emotional release',
    icon: MessageSquare,
    gradient: 'from-orange-500/10 to-orange-500/5',
    iconColor: 'text-orange-500',
    page: 'vent' as AppPage,
  },
  {
    id: 'mentor',
    title: 'Find a Mentor',
    description: 'Connect with experienced peers',
    icon: Users,
    gradient: 'from-green-500/10 to-green-500/5',
    iconColor: 'text-green-500',
    page: 'comingSoon' as AppPage,
    comingSoon: true,
  },
  {
    id: 'checkIn',
    title: 'Daily Check-In',
    description: 'Track your mood and wellbeing',
    icon: Calendar,
    gradient: 'from-pink-500/10 to-pink-500/5',
    iconColor: 'text-pink-500',
    page: 'mood' as AppPage,
  },
  {
    id: 'aiThought',
    title: 'AI Thought Support',
    description: 'Cognitive reframing assistance',
    icon: Brain,
    gradient: 'from-cyan-500/10 to-cyan-500/5',
    iconColor: 'text-cyan-500',
    page: 'thoughts' as AppPage,
  },
];

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { data: userProfile } = useGetCallerUserProfile();

  const handleCardClick = (card: typeof dashboardCards[0]) => {
    if (card.comingSoon) {
      onNavigate('comingSoon');
    } else {
      onNavigate(card.page);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome back, {userProfile?.name || 'Doctor'}
        </h1>
        <p className="text-lg text-muted-foreground">
          Your private sanctuary for emotional wellbeing
        </p>
      </div>

      {/* Main feature cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              className={`bg-gradient-to-br ${card.gradient} border-border/50 hover:border-primary/30 transition-all cursor-pointer group hover:shadow-lg`}
              onClick={() => handleCardClick(card)}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-background/50 ${card.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {card.title}
                    {card.comingSoon && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-normal">
                        Soon
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1.5">{card.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Master entry button */}
      <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-primary/30 shadow-xl hover:shadow-2xl transition-all">
        <CardContent className="p-8">
          <Button
            size="lg"
            className="w-full h-16 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            onClick={() => onNavigate('supportModules')}
          >
            <Heart className="w-6 h-6 mr-3" />
            What's happening right now?
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Access real-time emotional support modules
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
