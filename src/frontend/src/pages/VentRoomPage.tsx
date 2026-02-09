import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useBrowseVentRoom, useCreateVent, useGetVentReactions, useAddVentReaction, Reaction } from '../hooks/useQueries';
import { MessageSquare, Send, AlertCircle, Wind } from 'lucide-react';
import DistressPromptDialog from '../components/vent/DistressPromptDialog';
import { toast } from 'sonner';

interface VentRoomPageProps {
  onNavigateToCrisis: () => void;
}

export default function VentRoomPage({ onNavigateToCrisis }: VentRoomPageProps) {
  const [ventText, setVentText] = useState('');
  const [showDistressPrompt, setShowDistressPrompt] = useState(false);
  const { data: vents = [] } = useBrowseVentRoom();
  const createVent = useCreateVent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ventText.trim() || ventText.length > 500) return;

    createVent.mutate(ventText.trim(), {
      onSuccess: () => {
        setVentText('');
      },
      onError: (error: any) => {
        const errorMessage = error?.message || 'Failed to submit vent';
        
        // Check if it's a blocked content error
        if (errorMessage.includes('blocked') || errorMessage.includes('not allowed') || errorMessage.includes('prohibited')) {
          toast.error('Your message contains content that is not allowed. Please review our community guidelines.');
        } else if (errorMessage.includes('distress')) {
          // Distress detected but not blocked
          setShowDistressPrompt(true);
        } else {
          toast.error(errorMessage);
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vent Room</h1>
        <p className="text-muted-foreground mt-1">Let it out in a safe, anonymous space</p>
      </div>

      <Alert className="bg-accent/30 border-accent">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm">
            Feeling overwhelmed? Crisis resources are available 24/7.
          </span>
          <Button variant="outline" size="sm" onClick={onNavigateToCrisis}>
            Get Help Now
          </Button>
        </AlertDescription>
      </Alert>

      <Card className="bg-gradient-to-br from-card to-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Quick Vent
          </CardTitle>
          <CardDescription>Release what's weighing on you</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={ventText}
              onChange={(e) => setVentText(e.target.value)}
              placeholder="What's frustrating you right now? Let it all out... (max 500 characters)"
              rows={4}
              maxLength={500}
              required
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {ventText.length}/500 characters • Completely anonymous
              </p>
              <Button type="submit" disabled={createVent.isPending || !ventText.trim()} className="gap-2">
                <Send className="w-4 h-4" />
                {createVent.isPending ? 'Sending...' : 'Vent'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Vents
          </CardTitle>
          <CardDescription>You're not alone in what you're feeling</CardDescription>
        </CardHeader>
        <CardContent>
          {vents.length > 0 ? (
            <div className="space-y-3">
              {vents
                .slice()
                .reverse()
                .map((vent, index) => {
                  const date = new Date(Number(vent.timestamp / BigInt(1000000)));
                  const timeAgo = Math.floor((Date.now() - date.getTime()) / 60000);
                  const timeDisplay =
                    timeAgo < 60
                      ? `${timeAgo}m ago`
                      : timeAgo < 1440
                      ? `${Math.floor(timeAgo / 60)}h ago`
                      : `${Math.floor(timeAgo / 1440)}d ago`;

                  return (
                    <VentItem
                      key={index}
                      vent={vent}
                      timeDisplay={timeDisplay}
                    />
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No vents yet. Be the first to let it out!
            </p>
          )}
        </CardContent>
      </Card>

      <DistressPromptDialog
        open={showDistressPrompt}
        onOpenChange={setShowDistressPrompt}
        onNavigateToCrisis={() => {
          setShowDistressPrompt(false);
          onNavigateToCrisis();
        }}
      />
    </div>
  );
}

interface VentItemProps {
  vent: { content: string; timestamp: bigint };
  timeDisplay: string;
}

function VentItem({ vent, timeDisplay }: VentItemProps) {
  const { data: reactions = [] } = useGetVentReactions(vent.timestamp);
  const addReaction = useAddVentReaction();

  const getReactionCount = (reaction: Reaction) => {
    const found = reactions.find((r) => r.reaction === reaction);
    return found ? Number(found.count) : 0;
  };

  const handleReaction = (reaction: Reaction) => {
    addReaction.mutate({ postTimestamp: vent.timestamp, reaction });
  };

  return (
    <div className="p-4 rounded-lg bg-accent/50 space-y-3">
      <p className="text-sm whitespace-pre-wrap break-words">{vent.content}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{timeDisplay}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 hover:bg-accent"
            onClick={() => handleReaction(Reaction.heart)}
          >
            <span>🤍</span>
            <span className="text-xs">{getReactionCount(Reaction.heart)}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 hover:bg-accent"
            onClick={() => handleReaction(Reaction.strength)}
          >
            <span>🤝</span>
            <span className="text-xs">{getReactionCount(Reaction.strength)}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 hover:bg-accent"
            onClick={() => handleReaction(Reaction.support)}
          >
            <span>🫂</span>
            <span className="text-xs">{getReactionCount(Reaction.support)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
