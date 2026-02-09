import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAddThought, useGetThoughtHistory } from '../hooks/useQueries';
import { Brain, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function ThoughtDiaryPage() {
  const [thought, setThought] = useState('');
  const [emotion, setEmotion] = useState('');
  const [reframe, setReframe] = useState('');
  const { data: thoughtHistory = [] } = useGetThoughtHistory();
  const addThought = useAddThought();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thought.trim() || !emotion.trim()) return;

    addThought.mutate(
      {
        thought: thought.trim(),
        emotion: emotion.trim(),
        reframe: reframe.trim() || undefined,
      },
      {
        onSuccess: () => {
          setThought('');
          setEmotion('');
          setReframe('');
        },
      }
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Thought Diary</h1>
        <p className="text-muted-foreground mt-1">Practice cognitive reframing and emotional awareness</p>
      </div>

      <Card className="bg-gradient-to-br from-card to-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            New Thought Entry
          </CardTitle>
          <CardDescription>Capture your thoughts and explore alternative perspectives</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="thought">What's on your mind?</Label>
              <Textarea
                id="thought"
                value={thought}
                onChange={(e) => setThought(e.target.value)}
                placeholder="Describe the thought or situation that's bothering you..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emotion">How does this make you feel?</Label>
              <Textarea
                id="emotion"
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                placeholder="Anxious, frustrated, sad, overwhelmed..."
                rows={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reframe" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Reframe (Optional)
              </Label>
              <Textarea
                id="reframe"
                value={reframe}
                onChange={(e) => setReframe(e.target.value)}
                placeholder="Try to look at this from a different perspective. What would you tell a friend in this situation?"
                rows={3}
              />
            </div>

            <Button type="submit" disabled={addThought.isPending} className="w-full" size="lg">
              {addThought.isPending ? 'Saving...' : 'Save Entry'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Thought History</CardTitle>
          <CardDescription>Review your past entries and reflections</CardDescription>
        </CardHeader>
        <CardContent>
          {thoughtHistory.length > 0 ? (
            <div className="space-y-3">
              {thoughtHistory
                .slice()
                .reverse()
                .map((entry, index) => {
                  const date = new Date(Number(entry.timestamp / BigInt(1000000)));

                  return (
                    <Collapsible key={index}>
                      <div className="p-4 rounded-lg bg-accent/50 space-y-2">
                        <CollapsibleTrigger asChild>
                          <button className="w-full flex items-start justify-between text-left hover:opacity-80 transition-opacity">
                            <div className="flex-1">
                              <p className="font-medium line-clamp-2">{entry.thought}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {date.toLocaleDateString()} • Feeling: {entry.emotion}
                              </p>
                            </div>
                            <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3 pt-3 border-t border-border/50">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1">THOUGHT</p>
                            <p className="text-sm">{entry.thought}</p>
                          </div>
                          {entry.reframe && (
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                                <Lightbulb className="w-3 h-3" />
                                REFRAME
                              </p>
                              <p className="text-sm bg-accent/50 p-3 rounded">{entry.reframe}</p>
                            </div>
                          )}
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No thought entries yet. Start journaling to build your thought diary!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
