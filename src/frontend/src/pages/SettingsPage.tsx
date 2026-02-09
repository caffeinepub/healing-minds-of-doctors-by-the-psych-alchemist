import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Download, Bell, FileText, Shield } from 'lucide-react';
import { AppPage } from '../App';
import AndroidApkDownloadCard from '../components/settings/AndroidApkDownloadCard';

interface SettingsPageProps {
  onNavigate: (page: AppPage) => void;
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const { identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile
          </CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{userProfile?.name || 'Not set'}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Principal ID</p>
            <p className="font-mono text-xs break-all">{identity?.getPrincipal().toString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Android APK Download Card */}
      <AndroidApkDownloadCard />

      {/* Self-Care Reminders Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Self-Care Reminders
          </CardTitle>
          <CardDescription>Manage your wellness notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Set up reminders to check in with yourself throughout the day
          </p>
          <Button variant="outline" disabled>
            <Bell className="w-4 h-4 mr-2" />
            Configure Reminders (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Data Export Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Your Data
          </CardTitle>
          <CardDescription>Download a copy of your wellness data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Export your mood entries, thought diary, and other personal data
          </p>
          <Button variant="outline" disabled>
            <Download className="w-4 h-4 mr-2" />
            Export Data (Coming Soon)
          </Button>
        </CardContent>
      </Card>

      {/* Privacy & Legal Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy & Legal
          </CardTitle>
          <CardDescription>Review our policies and terms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('privacy')}>
            <FileText className="w-4 h-4 mr-2" />
            Privacy Policy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
