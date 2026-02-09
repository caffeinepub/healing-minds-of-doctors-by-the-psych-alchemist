import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAddMood, useGetMoodHistory } from '../hooks/useQueries';
import { Heart, TrendingUp } from 'lucide-react';

const moods = [
  { value: 'great', emoji: '😊', label: 'Great', color: 'text-green-500' },
  { value: 'good', emoji: '🙂', label: 'Good', color: 'text-blue-500' },
  { value: 'okay', emoji: '😐', label: 'Okay', color: 'text-yellow-500' },
  { value: 'struggling', emoji: '😔', label: 'Struggling', color: 'text-orange-500' },
  { value: 'overwhelmed', emoji: '😰', label: 'Overwhelmed', color: 'text-red-500' },
];

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [burnoutRating, setBurnoutRating] = useState([5]);
  const { data: moodHistory = [] } = useGetMoodHistory();
  const addMood = useAddMood();

  const handleSubmit = () => {
    if (!selectedMood) return;

    addMood.mutate(
      {
        mood: selectedMood,
        burnoutRating: burnoutRating[0],
      },
      {
        onSuccess: () => {
          setSelectedMood(null);
          setBurnoutRating([5]);
        },
      }
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Mood Tracker</h1>
        <p className="text-muted-foreground mt-1">Check in with yourself and track your emotional wellbeing</p>
      </div>

      <Card className="bg-gradient-to-br from-card to-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            How are you feeling today?
          </CardTitle>
          <CardDescription>Select your current mood and burnout level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  selectedMood === mood.value
                    ? 'border-primary bg-primary/10 shadow-lg'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div className={`text-sm font-medium ${mood.color}`}>{mood.label}</div>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Burnout Level</label>
              <span className="text-2xl font-bold text-primary">{burnoutRating[0]}/10</span>
            </div>
            <Slider value={burnoutRating} onValueChange={setBurnoutRating} max={10} step={1} className="py-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>No burnout</span>
              <span>Severe burnout</span>
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={!selectedMood || addMood.isPending} className="w-full" size="lg">
            {addMood.isPending ? 'Saving...' : 'Save Mood Entry'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Entries
          </CardTitle>
          <CardDescription>Your mood tracking history</CardDescription>
        </CardHeader>
        <CardContent>
          {moodHistory.length > 0 ? (
            <div className="space-y-3">
              {moodHistory
                .slice()
                .reverse()
                .slice(0, 10)
                .map((entry, index) => {
                  const date = new Date(Number(entry.timestamp / BigInt(1000000)));
                  const moodData = moods.find((m) => m.value === entry.mood);

                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{moodData?.emoji || '😐'}</span>
                        <div>
                          <p className="font-medium capitalize">{entry.mood}</p>
                          <p className="text-xs text-muted-foreground">
                            {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      {entry.burnoutRating !== undefined && (
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Burnout</p>
                          <p className="font-semibold">{Number(entry.burnoutRating)}/10</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No mood entries yet. Start tracking your mood to see your history here!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
