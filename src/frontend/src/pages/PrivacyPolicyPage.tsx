import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export default function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground mt-1">How we protect your data</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Your Privacy Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-6 text-sm">
              <section>
                <h3 className="text-lg font-semibold mb-2">Introduction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Healing Minds of Doctors BY THE PSYCH-ALCHEMIST is committed to protecting your privacy and ensuring the security of your personal health information. This policy explains how we collect, use, and safeguard your data.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Data We Collect</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Authentication information (Internet Identity)</li>
                  <li>Verification details (medical license or student ID)</li>
                  <li>Mood tracking entries and burnout scores</li>
                  <li>CBT thought diary entries</li>
                  <li>Self-care reminder preferences</li>
                  <li>Anonymous community posts and vents</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">How We Use Your Data</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Your data is used exclusively to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Provide personalized mental health tracking and insights</li>
                  <li>Display your progress over time</li>
                  <li>Send self-care reminders (if enabled)</li>
                  <li>Verify your professional status</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Anonymous Features</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Community forum posts and vent room entries are completely anonymous. No identifying information (name, principal ID, or verification details) is attached to these posts. They cannot be traced back to you.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Data Storage & Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All data is stored on the Internet Computer blockchain, which provides:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                  <li>End-to-end encryption</li>
                  <li>Decentralized storage (no single point of failure)</li>
                  <li>Tamper-proof records</li>
                  <li>No third-party access</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Data Sharing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, rent, or share your personal data with third parties. Your information is never used for advertising or marketing purposes.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Access all your stored data</li>
                  <li>Export your data as a PDF</li>
                  <li>Delete your account and all associated data</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Medical Disclaimer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  This application is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a mental health crisis, please contact emergency services or a crisis hotline immediately.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about this privacy policy or your data, please contact us through the app's support channels.
                </p>
              </section>

              <section className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Last updated: February 9, 2026
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
