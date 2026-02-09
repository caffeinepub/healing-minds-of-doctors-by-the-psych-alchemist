import { type AppPage } from '../../App';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import InAppReminderBanner from '../reminders/InAppReminderBanner';
import {
  Home,
  Heart,
  Brain,
  Wind,
  Users,
  MessageSquare,
  Sparkles,
  AlertCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
}

const navItems = [
  { id: 'dashboard' as AppPage, label: 'Dashboard', icon: Home },
  { id: 'mood' as AppPage, label: 'Mood Tracker', icon: Heart },
  { id: 'thoughts' as AppPage, label: 'Thought Diary', icon: Brain },
  { id: 'tools' as AppPage, label: 'Tools', icon: Wind },
  { id: 'community' as AppPage, label: 'Community', icon: Users },
  { id: 'vent' as AppPage, label: 'Vent Room', icon: MessageSquare },
  { id: 'relaxation' as AppPage, label: 'Relaxation', icon: Sparkles },
  { id: 'crisis' as AppPage, label: 'Crisis Resources', icon: AlertCircle },
];

export default function AppLayout({ children, currentPage, onNavigate }: AppLayoutProps) {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleNavigate = (page: AppPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-accent/50 rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight">Healing Minds</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Psych-Alchemist</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNavigate('settings')}
              className="hidden sm:flex hover:bg-accent/50 rounded-xl"
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="hover:bg-destructive/10 hover:text-destructive rounded-xl"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-72 border-r border-border/50 bg-card/30 backdrop-blur-sm">
          <ScrollArea className="flex-1 py-6">
            <nav className="space-y-1 px-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`w-full justify-start gap-3 h-11 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary hover:bg-primary/15 shadow-sm' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleNavigate(item.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
              <Separator className="my-4 bg-border/50" />
              <Button
                variant={currentPage === 'settings' ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 h-11 rounded-xl transition-all ${
                  currentPage === 'settings'
                    ? 'bg-primary/10 text-primary hover:bg-primary/15 shadow-sm'
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => handleNavigate('settings')}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Button>
            </nav>

            <div className="mt-8 px-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{userProfile?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">Medical Professional</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
            <ScrollArea className="h-full py-20 px-4">
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={`w-full justify-start gap-3 h-12 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-primary/10 text-primary hover:bg-primary/15' 
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => handleNavigate(item.id)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  );
                })}
                <Separator className="my-4 bg-border/50" />
                <Button
                  variant={currentPage === 'settings' ? 'secondary' : 'ghost'}
                  className={`w-full justify-start gap-3 h-12 rounded-xl transition-all ${
                    currentPage === 'settings'
                      ? 'bg-primary/10 text-primary hover:bg-primary/15'
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => handleNavigate('settings')}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Button>
              </nav>
            </ScrollArea>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            <InAppReminderBanner />
            {children}
          </div>

          {/* Footer */}
          <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Healing Minds of Doctors</p>
                <p className="flex items-center gap-1">
                  Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
                  <a
                    href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                      typeof window !== 'undefined' ? window.location.hostname : 'healing-minds'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    caffeine.ai
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
