import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedBreathingPageProps {
  onBack: () => void;
}

const MEDITATION_SCRIPT = `Welcome to this 3-minute guided breathing meditation.

Find a comfortable position, either sitting or lying down.

Close your eyes if that feels comfortable, or soften your gaze.

Begin by taking a deep breath in through your nose... and slowly exhale through your mouth.

Notice the natural rhythm of your breath. There's no need to change it, just observe.

With each inhale, imagine breathing in calm and peace.

With each exhale, release any tension or stress you're holding.

Continue breathing naturally, letting your body relax more deeply with each breath.

If your mind wanders, gently bring your attention back to your breath.

Notice the sensation of air entering and leaving your body.

Feel your chest and belly rise and fall with each breath.

You are safe. You are present. You are enough.

Continue this peaceful breathing for the remaining time.

When you're ready, slowly open your eyes and return to the present moment.

Thank you for taking this time for yourself.`;

export default function EnhancedBreathingPage({ onBack }: EnhancedBreathingPageProps) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([0.5]);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/assets/breathing/ambient.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume[0];

    audioRef.current.addEventListener('error', () => {
      setAudioError(true);
      toast.error('Background audio could not be loaded. Breathing exercise will continue without sound.');
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
  }, []);

  useEffect(() => {
    if (audioRef.current && !audioError) {
      audioRef.current.volume = isMuted ? 0 : volume[0];
    }
  }, [volume, isMuted, audioError]);

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
    if (audioRef.current && !audioError) {
      audioRef.current.play().catch(() => {
        toast.error('Could not play background audio. Continuing without sound.');
      });
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current && !audioError) {
      audioRef.current.pause();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeLeft(180);
    if (audioRef.current && !audioError) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((180 - timeLeft) / 180) * 100;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2 hover:bg-accent/50 rounded-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Enhanced Breathing Meditation</h1>
        <p className="text-lg text-muted-foreground">3-minute guided session with ambient music</p>
      </div>

      {/* Main Timer Card */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-chart-2/10 via-card to-card border-chart-2/20 shadow-2xl">
        {/* Breathing illustration */}
        <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
          <img 
            src="/assets/generated/breathing-illustration.dim_512x512.png" 
            alt="" 
            className="w-48 h-48 object-contain"
          />
        </div>

        <CardHeader className="relative z-10 text-center pb-8">
          <CardTitle className="text-2xl">Breathe & Relax</CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 space-y-8">
          {/* Timer Display */}
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              {/* Progress ring */}
              <svg className="w-64 h-64 transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 120}`}
                  strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                  className="text-chart-2 transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold tracking-tight">{formatTime(timeLeft)}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  {timeLeft === 180 ? 'Ready to begin' : timeLeft === 0 ? 'Complete!' : 'Remaining'}
                </div>
              </div>
            </div>
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
            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="w-16 h-16 rounded-full hover:bg-accent/50 transition-all"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>

          {/* Volume Control */}
          {!audioError && (
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-accent/30 border border-border/50">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="flex-shrink-0 hover:bg-accent/50 rounded-xl"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={1}
                step={0.1}
                className="flex-1"
                disabled={isMuted}
              />
              <span className="text-sm text-muted-foreground w-12 text-right">
                {isMuted ? '0%' : `${Math.round(volume[0] * 100)}%`}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guided Script */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">Guided Script</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div className="whitespace-pre-line text-muted-foreground leading-relaxed space-y-4">
              {MEDITATION_SCRIPT.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-sm leading-loose">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
