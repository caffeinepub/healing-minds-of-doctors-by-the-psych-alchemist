import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetAllQuotes } from '../hooks/useQueries';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const defaultQuotes = [
  {
    content: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
  },
  {
    content: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
  },
  {
    content: 'Your time is limited, so don\'t waste it living someone else\'s life.',
    author: 'Steve Jobs',
  },
  {
    content: 'If life were predictable it would cease to be life, and be without flavor.',
    author: 'Eleanor Roosevelt',
  },
  {
    content: 'Life is what happens when you\'re busy making other plans.',
    author: 'John Lennon',
  },
];

const wellnessArticles = [
  {
    title: 'Managing Burnout in Healthcare',
    content: 'Burnout is a state of emotional, physical, and mental exhaustion caused by excessive and prolonged stress. For healthcare professionals, recognizing the signs early and taking proactive steps is crucial.',
  },
  {
    title: 'The Importance of Self-Compassion',
    content: 'Self-compassion involves treating yourself with the same kindness and understanding you would offer a good friend. Research shows it\'s a powerful tool for mental wellbeing.',
  },
  {
    title: 'Mindfulness for Medical Professionals',
    content: 'Mindfulness practices can help healthcare workers stay present, reduce stress, and improve patient care. Even brief daily practices can make a significant difference.',
  },
];

export default function RelaxationPage() {
  const { data: quotes = [] } = useGetAllQuotes();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const displayQuotes = quotes.length > 0 ? quotes : defaultQuotes;

  const handleRefresh = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % displayQuotes.length);
  };

  const currentQuote = displayQuotes[currentQuoteIndex];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Relaxation & Inspiration</h1>
        <p className="text-muted-foreground mt-1">Take a moment to pause and reflect</p>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Daily Inspiration
          </CardTitle>
          <CardDescription>A moment of reflection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4 py-8">
            <p className="text-xl md:text-2xl font-serif italic leading-relaxed">"{currentQuote.content}"</p>
            <p className="text-sm text-muted-foreground">— {currentQuote.author}</p>
          </div>
          <Button onClick={handleRefresh} variant="outline" className="w-full gap-2">
            <RefreshCw className="w-4 h-4" />
            New Quote
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wellness Resources</CardTitle>
          <CardDescription>Articles and tips for medical professionals</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="0" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {wellnessArticles.map((_, index) => (
                <TabsTrigger key={index} value={index.toString()}>
                  Article {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {wellnessArticles.map((article, index) => (
              <TabsContent key={index} value={index.toString()} className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{article.content}</p>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
