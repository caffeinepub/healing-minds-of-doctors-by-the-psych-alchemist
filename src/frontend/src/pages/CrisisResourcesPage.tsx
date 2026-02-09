import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Phone, ExternalLink, Heart } from 'lucide-react';

export default function CrisisResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Crisis Resources</h1>
        <p className="text-muted-foreground mt-1">Immediate help is available</p>
      </div>

      <Alert variant="destructive" className="border-2">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-bold">If you are in immediate danger</AlertTitle>
        <AlertDescription className="text-base mt-2">
          Please call emergency services (911 in the US) or go to your nearest emergency room immediately.
        </AlertDescription>
      </Alert>

      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Phone className="w-6 h-6" />
            24/7 Crisis Hotlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-accent/50">
              <h3 className="font-semibold text-lg mb-1">National Suicide Prevention Lifeline (US)</h3>
              <p className="text-2xl font-bold text-primary mb-2">988</p>
              <p className="text-sm text-muted-foreground">
                Free, confidential support 24/7 for people in distress
              </p>
              <Button variant="outline" className="mt-3 gap-2" asChild>
                <a href="tel:988">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-accent/50">
              <h3 className="font-semibold text-lg mb-1">Crisis Text Line</h3>
              <p className="text-xl font-bold text-primary mb-2">Text HOME to 741741</p>
              <p className="text-sm text-muted-foreground">
                Free, 24/7 support via text message
              </p>
            </div>

            <div className="p-4 rounded-lg bg-accent/50">
              <h3 className="font-semibold text-lg mb-1">Physician Support Line</h3>
              <p className="text-xl font-bold text-primary mb-2">1-888-409-0141</p>
              <p className="text-sm text-muted-foreground">
                Confidential support specifically for physicians and medical students
              </p>
              <Button variant="outline" className="mt-3 gap-2" asChild>
                <a href="tel:1-888-409-0141">
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Additional Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-between" asChild>
            <a href="https://www.afsp.org/healthcare-professional-burnout-depression-suicide-prevention" target="_blank" rel="noopener noreferrer">
              <span>AFSP Healthcare Professional Resources</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-between" asChild>
            <a href="https://www.nami.org/Support-Education/Support-Groups" target="_blank" rel="noopener noreferrer">
              <span>NAMI Support Groups</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-between" asChild>
            <a href="https://www.samhsa.gov/find-help/national-helpline" target="_blank" rel="noopener noreferrer">
              <span>SAMHSA National Helpline</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Alert className="bg-accent/30 border-accent">
        <Heart className="h-4 w-4" />
        <AlertTitle>You are not alone</AlertTitle>
        <AlertDescription>
          Seeking help is a sign of strength, not weakness. Your well-being matters, and support is available.
        </AlertDescription>
      </Alert>
    </div>
  );
}
