import { type AppPage } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wind, Sparkles, ArrowRight, Circle } from 'lucide-react';

interface ToolsPageProps {
  onNavigate: (page: AppPage) => void;
}

export default function ToolsPage({ onNavigate }: ToolsPageProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Wellness Tools</h1>
        <p className="text-lg text-muted-foreground">Resources to support your mental health journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Enhanced Breathing Card */}
        <Card 
          className="group relative overflow-hidden bg-gradient-to-br from-chart-2/10 via-card to-card border-chart-2/20 hover:border-chart-2/40 transition-all duration-500 hover:shadow-2xl hover:shadow-chart-2/10 cursor-pointer"
          onClick={() => onNavigate('breathing')}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-chart-2/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <CardHeader className="relative z-10 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-chart-2/20 to-chart-2/5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Wind className="w-7 h-7 text-chart-2" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-1">Enhanced Breathing</CardTitle>
                  <CardDescription className="text-base">3-minute guided meditation</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              A calming breathing exercise with timer, guided script, and ambient background music to help you relax and center yourself.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-chart-2/10 text-chart-2 text-xs font-medium">Guided Audio</span>
              <span className="px-3 py-1 rounded-full bg-chart-2/10 text-chart-2 text-xs font-medium">3 Minutes</span>
              <span className="px-3 py-1 rounded-full bg-chart-2/10 text-chart-2 text-xs font-medium">Ambient Music</span>
            </div>
            <Button 
              onClick={() => onNavigate('breathing')} 
              className="w-full h-12 gap-2 rounded-xl shadow-lg shadow-chart-2/20 bg-chart-2 hover:bg-chart-2/90 text-white group-hover:shadow-xl group-hover:shadow-chart-2/30 transition-all"
            >
              Start Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>

        {/* Relaxation Content Card */}
        <Card 
          className="group relative overflow-hidden bg-gradient-to-br from-chart-4/10 via-card to-card border-chart-4/20 hover:border-chart-4/40 transition-all duration-500 hover:shadow-2xl hover:shadow-chart-4/10 cursor-pointer"
          onClick={() => onNavigate('relaxation')}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-chart-4/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
          <CardHeader className="relative z-10 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-chart-4/20 to-chart-4/5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Sparkles className="w-7 h-7 text-chart-4" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-1">Relaxation Content</CardTitle>
                  <CardDescription className="text-base">Quotes and wellness tips</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Browse inspirational quotes and helpful articles designed specifically for medical professionals.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-chart-4/10 text-chart-4 text-xs font-medium">Daily Quotes</span>
              <span className="px-3 py-1 rounded-full bg-chart-4/10 text-chart-4 text-xs font-medium">Wellness Tips</span>
              <span className="px-3 py-1 rounded-full bg-chart-4/10 text-chart-4 text-xs font-medium">Articles</span>
            </div>
            <Button 
              onClick={() => onNavigate('relaxation')} 
              variant="outline" 
              className="w-full h-12 gap-2 rounded-xl border-chart-4/30 hover:bg-chart-4/10 hover:border-chart-4/50 group-hover:shadow-lg transition-all"
            >
              Browse Content
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Guide Card */}
      <Card className="bg-gradient-to-br from-accent/50 to-accent/30 border-accent/50 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20">
              <Circle className="w-5 h-5 text-primary" />
            </div>
            <CardTitle className="text-xl">Quick Breathing Exercise (5 minutes)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-3">
            <p className="font-semibold text-base">Box Breathing Technique:</p>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">1</span>
                <span className="text-muted-foreground">Breathe in slowly through your nose for 4 counts</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">2</span>
                <span className="text-muted-foreground">Hold your breath for 4 counts</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">3</span>
                <span className="text-muted-foreground">Exhale slowly through your mouth for 4 counts</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">4</span>
                <span className="text-muted-foreground">Hold for 4 counts before the next breath</span>
              </li>
              <li className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">5</span>
                <span className="text-muted-foreground">Repeat for 5 minutes</span>
              </li>
            </ol>
          </div>
          <div className="pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground leading-relaxed">
              This technique is used by medical professionals worldwide to reduce stress and improve focus during high-pressure situations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
