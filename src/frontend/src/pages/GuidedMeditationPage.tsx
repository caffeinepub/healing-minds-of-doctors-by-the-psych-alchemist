import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, ArrowLeft } from 'lucide-react';
import BreathingVisual from '../components/support/BreathingVisual';
import { ambientSounds, meditationScript } from '../content/guidedMeditation';
import { toast } from 'sonner';

interface GuidedMeditationPageProps {
  onBack: () => void;
}

export default function GuidedMeditationPage({ onBack }: GuidedMeditationPageProps) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSound, setSelectedSound] = useState('rain');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Handle audio source changes
  useEffect(() => {
    const sound = ambientSounds.find((s) => s.id === selectedSound);
    if (!sound) return;

    const wasPlaying = isPlaying;

    // Clean up existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('error', handleAudioError);
      audioRef.current.removeEventListener('canplaythrough', handleAudioReady);
    }

    // Create new audio element with selected source
    audioRef.current = new Audio(sound.path);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Add event listeners
    audioRef.current.addEventListener('error', handleAudioError);
    audioRef.current.addEventListener('canplaythrough', handleAudioReady);

    // If we were playing, load and resume playback
    if (wasPlaying) {
      audioRef.current.load();
      audioRef.current.play().catch((error) => {
        console.error('Audio playback failed:', error);
        toast.error('Could not play the selected audio. Please try another option.');
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleAudioError);
        audioRef.current.removeEventListener('canplaythrough', handleAudioReady);
        audioRef.current = null;
      }
    };
  }, [selectedSound]);

  // Handle audio errors
  const handleAudioError = () => {
    const sound = ambientSounds.find((s) => s.id === selectedSound);
    const isRemoteUrl = sound?.path.startsWith('http://') || sound?.path.startsWith('https://');
    
    if (isRemoteUrl) {
      toast.error('Could not load online audio. Please check your connection or try a local option.');
    } else {
      toast.error('Audio file could not be loaded. Please try another option.');
    }
    
    setIsPlaying(false);
  };

  // Handle audio ready state
  const handleAudioReady = () => {
    // Audio is ready to play
  };

  // Timer effect
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
    if (!audioRef.current) return;

    setIsPlaying(true);
    audioRef.current.play().catch((error) => {
      console.error('Audio playback failed:', error);
      toast.error('Could not play audio. Please try again or select a different option.');
      setIsPlaying(false);
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimeLeft(180);
    if (audioRef.current) {
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
        <h1 className="text-4xl font-bold tracking-tight">3-Minute Reset for Doctors</h1>
        <p className="text-lg text-muted-foreground">Guided meditation with ambient sounds</p>
      </div>

      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-card to-card border-purple-500/20 shadow-2xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl">Breathe & Center</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Ambient Sound Selector */}
          <div className="space-y-3">
            <label className="text-sm font-semibold">Ambient Sound</label>
            <Select value={selectedSound} onValueChange={setSelectedSound}>
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ambientSounds.map((sound) => (
                  <SelectItem key={sound.id} value={sound.id}>
                    {sound.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Breathing Visual */}
          <div className="flex justify-center py-8">
            <BreathingVisual isActive={isPlaying} />
          </div>

          {/* Timer Display */}
          <div className="text-center space-y-2">
            <div className="text-5xl font-bold tracking-tight">{formatTime(timeLeft)}</div>
            <div className="text-sm text-muted-foreground">
              {timeLeft === 180 ? 'Ready to begin' : timeLeft === 0 ? 'Complete!' : 'Remaining'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all duration-1000 ease-linear"
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
            <Button
              size="lg"
              variant="outline"
              onClick={handleReset}
              className="w-16 h-16 rounded-full hover:bg-accent/50 transition-all"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
          </div>
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
              {meditationScript.split('\n\n').map((paragraph, index) => (
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
