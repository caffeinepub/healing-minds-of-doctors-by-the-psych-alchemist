import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, X, ArrowLeft } from 'lucide-react';
import { supportModules } from '../content/supportModules';
import BreathingVisual from '../components/support/BreathingVisual';
import { toast } from 'sonner';

interface SupportModulePlayerPageProps {
  moduleId: string;
  onBack: () => void;
}

export default function SupportModulePlayerPage({ moduleId, onBack }: SupportModulePlayerPageProps) {
  const module = supportModules.find((m) => m.id === moduleId);
  const [timeLeft, setTimeLeft] = useState(module?.duration || 60);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!module) return;

    audioRef.current = new Audio(module.audioPath);
    audioRef.current.loop = false;

    audioRef.current.addEventListener('error', () => {
      toast.error('Audio file could not be loaded. Please try again.');
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [module]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePause();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, timeLeft]);

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current?.play().catch(() => {
      toast.error('Could not play audio. Please try again.');
      setIsPlaying(false);
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const handleExit = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!module) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <p className="text-center text-muted-foreground">Module not found</p>
      </div>
    );
  }

  const progress = ((module.duration - timeLeft) / module.duration) * 100;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleExit} className="gap-2 hover:bg-accent/50 rounded-xl">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button variant="ghost" size="icon" onClick={handleExit} className="hover:bg-destructive/10 hover:text-destructive rounded-xl">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{module.title}</h1>
        <p className="text-lg text-muted-foreground">Take a moment to ground yourself</p>
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl">Breathe & Reset</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Breathing Visual */}
          <div className="flex justify-center py-8">
            <BreathingVisual isActive={isPlaying} />
          </div>

          {/* Timer Display */}
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold tracking-tight">{formatTime(timeLeft)}</div>
            <div className="text-sm text-muted-foreground">
              {timeLeft === module.duration ? 'Ready to begin' : timeLeft === 0 ? 'Complete!' : 'Remaining'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={timeLeft === 0}
              className="w-16 h-16 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
