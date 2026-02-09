import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useBrowseAnonPeerPosts, useCreateAnonPeerPost } from '../hooks/useQueries';
import { Users, Plus, AlertCircle, MessageSquare } from 'lucide-react';
import { type AppPage } from '../App';

export default function CommunityForumPage() {
  const [newPost, setNewPost] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { data: posts = [] } = useBrowseAnonPeerPosts();
  const createPost = useCreateAnonPeerPost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || newPost.length > 1000) return;

    createPost.mutate(newPost.trim(), {
      onSuccess: () => {
        setNewPost('');
        setShowForm(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Anonymous Community</h1>
        <p className="text-muted-foreground mt-1">Share and connect with fellow medical professionals</p>
      </div>

      <Alert className="bg-accent/30 border-accent">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-sm">
            In crisis? Get immediate help from trained professionals.
          </span>
          <Button variant="outline" size="sm" asChild>
            <a href="#crisis">Crisis Resources</a>
          </Button>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Share Your Thoughts
              </CardTitle>
              <CardDescription>Post anonymously to the community</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : 'New Post'}
            </Button>
          </div>
        </CardHeader>
        {showForm && (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your experience, ask for advice, or offer support... (max 1000 characters)"
                  rows={5}
                  maxLength={1000}
                  required
                />
                <p className="text-xs text-muted-foreground text-right">
                  {newPost.length}/1000 characters
                </p>
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={createPost.isPending || !newPost.trim()} className="flex-1">
                  {createPost.isPending ? 'Posting...' : 'Post Anonymously'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your post will be completely anonymous. No identifying information is shared.
              </p>
            </form>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Community Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts
                .slice()
                .reverse()
                .map((post, index) => {
                  const date = new Date(Number(post.timestamp / BigInt(1000000)));
                  return (
                    <div key={index} className="p-4 rounded-lg border border-border bg-card space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm whitespace-pre-wrap break-words">{post.content}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Posted {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No posts yet. Be the first to share with the community!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
