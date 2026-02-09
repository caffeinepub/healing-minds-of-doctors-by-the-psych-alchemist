import { useEffect, useState } from 'react';

interface BreathingVisualProps {
  isActive: boolean;
}

export default function BreathingVisual({ isActive }: BreathingVisualProps) {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');

  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      return;
    }

    const interval = setInterval(() => {
      setPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
    }, 4000); // 4 seconds per phase (inhale/exhale)

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Breathing circle */}
      <div
        className={`absolute rounded-full bg-gradient-to-br from-primary/30 to-primary/10 transition-all duration-[4000ms] ease-in-out ${
          isActive && phase === 'inhale' ? 'w-48 h-48' : 'w-24 h-24'
        }`}
      />
      
      {/* Inner circle */}
      <div
        className={`absolute rounded-full bg-gradient-to-br from-primary/50 to-primary/20 transition-all duration-[4000ms] ease-in-out ${
          isActive && phase === 'inhale' ? 'w-32 h-32' : 'w-16 h-16'
        }`}
      />
      
      {/* Center dot */}
      <div className="absolute w-8 h-8 rounded-full bg-primary" />
      
      {/* Text instruction */}
      <div className="absolute -bottom-12 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          {isActive ? (phase === 'inhale' ? 'Breathe in...' : 'Breathe out...') : 'Ready'}
        </p>
      </div>
    </div>
  );
}
