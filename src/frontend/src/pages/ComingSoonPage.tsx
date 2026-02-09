import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ComingSoonPageProps {
  featureName: string;
  onBack: () => void;
}

export default function ComingSoonPage({ featureName, onBack }: ComingSoonPageProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 hover:bg-accent/50 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>

      <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 shadow-xl">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mx-auto">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">
            {featureName || 'This feature'} is currently under development.
          </p>
          <p className="text-sm text-muted-foreground">
            We're working hard to bring you the best experience. Check back soon!
          </p>
          <Button onClick={onBack} className="mt-6">
            Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
