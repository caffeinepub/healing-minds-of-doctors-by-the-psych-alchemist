import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import LoginPage from './pages/LoginPage';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import DashboardPage from './pages/DashboardPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import ThoughtDiaryPage from './pages/ThoughtDiaryPage';
import ToolsPage from './pages/ToolsPage';
import EnhancedBreathingPage from './pages/EnhancedBreathingPage';
import CommunityForumPage from './pages/CommunityForumPage';
import VentRoomPage from './pages/VentRoomPage';
import RelaxationPage from './pages/RelaxationPage';
import CrisisResourcesPage from './pages/CrisisResourcesPage';
import SettingsPage from './pages/SettingsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SupportModulesPage from './pages/SupportModulesPage';
import SupportModulePlayerPage from './pages/SupportModulePlayerPage';
import GuidedMeditationPage from './pages/GuidedMeditationPage';
import ComingSoonPage from './pages/ComingSoonPage';
import AppLayout from './components/layout/AppLayout';
import { useState } from 'react';

export type AppPage = 
  | 'dashboard'
  | 'mood'
  | 'thoughts'
  | 'tools'
  | 'breathing'
  | 'community'
  | 'vent'
  | 'relaxation'
  | 'crisis'
  | 'settings'
  | 'privacy'
  | 'supportModules'
  | 'supportModulePlayer'
  | 'guidedMeditation'
  | 'comingSoon';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [comingSoonFeature, setComingSoonFeature] = useState<string>('');

  const isAuthenticated = !!identity;

  // Show loading during initialization
  if (isInitializing || (isAuthenticated && profileLoading)) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="dark min-h-screen bg-background flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="dark">
          <LoginPage />
          <Toaster />
        </div>
      </ThemeProvider>
    );
  }

  // Show profile setup modal if user has no profile
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleNavigateToCrisis = () => {
    setCurrentPage('crisis');
  };

  const handleNavigateToModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentPage('supportModulePlayer');
  };

  const handleNavigateToComingSoon = (feature: string) => {
    setComingSoonFeature(feature);
    setCurrentPage('comingSoon');
  };

  // Render main app with layout
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="dark">
        <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
          {currentPage === 'dashboard' && <DashboardPage onNavigate={setCurrentPage} />}
          {currentPage === 'mood' && <MoodTrackerPage />}
          {currentPage === 'thoughts' && <ThoughtDiaryPage />}
          {currentPage === 'tools' && <ToolsPage onNavigate={setCurrentPage} />}
          {currentPage === 'breathing' && <EnhancedBreathingPage onBack={() => setCurrentPage('dashboard')} />}
          {currentPage === 'community' && <CommunityForumPage />}
          {currentPage === 'vent' && <VentRoomPage onNavigateToCrisis={handleNavigateToCrisis} />}
          {currentPage === 'relaxation' && <RelaxationPage />}
          {currentPage === 'crisis' && <CrisisResourcesPage />}
          {currentPage === 'settings' && <SettingsPage onNavigate={setCurrentPage} />}
          {currentPage === 'privacy' && <PrivacyPolicyPage onBack={() => setCurrentPage('settings')} />}
          {currentPage === 'supportModules' && (
            <SupportModulesPage 
              onBack={() => setCurrentPage('dashboard')} 
              onSelectModule={handleNavigateToModule}
            />
          )}
          {currentPage === 'supportModulePlayer' && selectedModuleId && (
            <SupportModulePlayerPage 
              moduleId={selectedModuleId}
              onBack={() => setCurrentPage('supportModules')}
            />
          )}
          {currentPage === 'guidedMeditation' && (
            <GuidedMeditationPage onBack={() => setCurrentPage('dashboard')} />
          )}
          {currentPage === 'comingSoon' && (
            <ComingSoonPage 
              featureName={comingSoonFeature}
              onBack={() => setCurrentPage('dashboard')} 
            />
          )}
        </AppLayout>
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
