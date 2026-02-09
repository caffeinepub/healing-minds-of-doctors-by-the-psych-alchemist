import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play } from 'lucide-react';
import { supportModules } from '../content/supportModules';

interface SupportModulesPageProps {
  onBack: () => void;
  onSelectModule: (moduleId: string) => void;
}

export default function SupportModulesPage({ onBack, onSelectModule }: SupportModulesPageProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 hover:bg-accent/50 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Real-Time Support</h1>
        <p className="text-lg text-muted-foreground">
          Choose what you're experiencing right now
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {supportModules.map((module) => (
          <Card
            key={module.id}
            className="bg-gradient-to-br from-card to-accent/10 border-border/50 hover:border-primary/30 transition-all cursor-pointer group hover:shadow-lg"
            onClick={() => onSelectModule(module.id)}
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription className="mt-2 text-sm">
                    {module.duration} seconds • Breathing + grounding
                  </CardDescription>
                </div>
                <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Play className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
