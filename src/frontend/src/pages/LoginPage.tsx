import LoginButton from '../components/auth/LoginButton';
import AndroidApkDownloadCard from '../components/settings/AndroidApkDownloadCard';
import { Heart, Brain, Users, Shield, Sparkles, Smartphone } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/bg-pattern-mandala.dim_1024x1024.png)',
          backgroundSize: '400px 400px'
        }}
      />
      
      {/* Hero gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/generated/hero-gradient.dim_1600x900.png)',
          mixBlendMode: 'soft-light'
        }}
      />

      <div className="w-full max-w-2xl space-y-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-6 shadow-lg shadow-primary/10">
            <Heart className="w-12 h-12 text-primary animate-pulse" style={{ animationDuration: '3s' }} />
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Healing Minds of Doctors
            </h1>
            <p className="text-sm text-primary font-semibold tracking-wider uppercase">
              BY THE PSYCH-ALCHEMIST
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              A sanctuary for mental wellness, designed exclusively for medical professionals
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-3 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-chart-1/20 to-chart-1/5 group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-6 h-6 text-chart-1" />
            </div>
            <h3 className="font-semibold text-lg">Evidence-Based Tools</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CBT diary, mood tracking, and mindfulness exercises backed by research
            </p>
          </div>

          <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-3 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-chart-2/20 to-chart-2/5 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-chart-2" />
            </div>
            <h3 className="font-semibold text-lg">Anonymous Community</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect with peers in a safe, judgment-free space
            </p>
          </div>

          <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 space-y-3 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-chart-3/20 to-chart-3/5 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-6 h-6 text-chart-3" />
            </div>
            <h3 className="font-semibold text-lg">Private & Secure</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your data is encrypted and never shared with anyone
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded-3xl p-10 space-y-6 shadow-2xl shadow-primary/5">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-primary mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Begin Your Journey</span>
            </div>
            <h2 className="text-2xl font-semibold">Access Your Sanctuary</h2>
            <p className="text-sm text-muted-foreground">
              Secure login with Internet Identity
            </p>
          </div>

          <div className="pt-2">
            <LoginButton />
          </div>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              For medical students and doctors only. Verification required after login.
            </p>
          </div>
        </div>

        {/* Android APK Download Section */}
        <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded-3xl p-8 space-y-4 shadow-2xl shadow-primary/5">
          <div className="text-center space-y-2 mb-4">
            <div className="inline-flex items-center gap-2 text-primary mb-2">
              <Smartphone className="w-5 h-5" />
              <span className="text-sm font-medium">Mobile Access</span>
            </div>
            <h2 className="text-xl font-semibold">Download Android APK</h2>
            <p className="text-sm text-muted-foreground">
              Access Healing Minds on your Android device
            </p>
          </div>
          
          <AndroidApkDownloadCard compact />
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Free Beta • No payment required • Always confidential
          </p>
        </div>
      </div>
    </div>
  );
}
