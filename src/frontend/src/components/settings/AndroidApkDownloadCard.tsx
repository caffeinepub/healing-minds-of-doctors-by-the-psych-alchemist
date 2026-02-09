import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Smartphone, AlertCircle, ExternalLink } from 'lucide-react';
import { useGetAndroidAPK } from '../../hooks/useQueries';

interface AndroidApkDownloadCardProps {
  compact?: boolean;
}

export default function AndroidApkDownloadCard({ compact = false }: AndroidApkDownloadCardProps) {
  const { data: apkUrl, isLoading, isError } = useGetAndroidAPK();

  // Handle error state gracefully - show fallback instructions
  const showFallback = isError || (!isLoading && !apkUrl);
  const hasValidUrl = !isLoading && apkUrl && typeof apkUrl === 'string';

  if (compact) {
    return (
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : hasValidUrl ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Download the Android app to access Healing Minds on your mobile device:
            </p>
            <Button asChild className="w-full">
              <a href={apkUrl} download="healing-minds.apk">
                <Smartphone className="w-4 h-4 mr-2" />
                Download Android APK
              </a>
            </Button>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                This is a <strong>debug APK</strong>. You may need to enable "Install from Unknown Sources" on your device.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              No APK download link is currently available. To build the Android app manually:
            </p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside ml-2">
              <li>Install Android Studio and the Android SDK</li>
              <li>Follow the instructions in <code className="text-xs bg-muted px-1 py-0.5 rounded">BUILD_ANDROID_APK.md</code></li>
              <li>Transfer the generated APK to your device</li>
            </ol>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          Android App (Debug APK)
        </CardTitle>
        <CardDescription>Install the Healing Minds app on your Android device</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            This is a <strong>debug APK</strong> for testing purposes. You may need to enable "Install from Unknown
            Sources" in your Android device settings.
          </AlertDescription>
        </Alert>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : showFallback ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              The Android APK is built manually using Capacitor. To generate a fresh debug APK:
            </p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside ml-2">
              <li>Ensure you have Android Studio and the Android SDK installed</li>
              <li>
                Follow the build instructions in{' '}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">BUILD_ANDROID_APK.md</code>
              </li>
              <li>The generated APK will be located in the Android build output directory</li>
              <li>Transfer the APK to your device via USB, email, or cloud storage</li>
            </ol>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a
                href="https://capacitorjs.com/docs/android"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Capacitor Android Docs
              </a>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Click the button below to download the latest debug APK to your device:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <a href={apkUrl!} download="healing-minds.apk">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Download APK
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  if (apkUrl) {
                    navigator.clipboard.writeText(apkUrl);
                  }
                }}
              >
                Copy Link
              </Button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Installation Steps:</h4>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside ml-2">
            <li>Download the APK file to your Android device</li>
            <li>Open the downloaded file from your notifications or file manager</li>
            <li>If prompted, allow installation from unknown sources</li>
            <li>Follow the on-screen installation prompts</li>
            <li>Launch the app and log in with Internet Identity</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
