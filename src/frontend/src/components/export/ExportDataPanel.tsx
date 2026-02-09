import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useGetMoodHistory, useGetThoughtHistory, type MoodEntry, type ThoughtEntry } from '../../hooks/useQueries';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ExportDataPanel() {
  const { data: moodHistory = [] } = useGetMoodHistory();
  const { data: thoughtHistory = [] } = useGetThoughtHistory();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = () => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    const start = new Date(startDate).getTime() * 1000000;
    const end = new Date(endDate).getTime() * 1000000;

    const filteredMoods = moodHistory.filter(
      (entry: MoodEntry) => Number(entry.timestamp) >= start && Number(entry.timestamp) <= end
    );
    const filteredThoughts = thoughtHistory.filter(
      (entry: ThoughtEntry) => Number(entry.timestamp) >= start && Number(entry.timestamp) <= end
    );

    if (filteredMoods.length === 0 && filteredThoughts.length === 0) {
      toast.error('No data found for the selected date range');
      return;
    }

    let content = `Mental Wellness Data Export\n`;
    content += `Date Range: ${startDate} to ${endDate}\n`;
    content += `Generated: ${new Date().toLocaleString()}\n\n`;
    content += `${'='.repeat(60)}\n\n`;

    if (filteredMoods.length > 0) {
      content += `MOOD ENTRIES (${filteredMoods.length})\n`;
      content += `${'='.repeat(60)}\n\n`;

      filteredMoods.forEach((entry: MoodEntry) => {
        const date = new Date(Number(entry.timestamp / BigInt(1000000)));
        content += `Date: ${date.toLocaleString()}\n`;
        content += `  Mood: ${entry.mood}\n`;
        content += `  Burnout Level: ${entry.burnoutRating ? Number(entry.burnoutRating) : 'N/A'}/10\n`;
        content += `\n`;
      });

      content += `\n`;
    }

    if (filteredThoughts.length > 0) {
      content += `THOUGHT DIARY ENTRIES (${filteredThoughts.length})\n`;
      content += `${'='.repeat(60)}\n\n`;

      filteredThoughts.forEach((entry: ThoughtEntry) => {
        const date = new Date(Number(entry.timestamp / BigInt(1000000)));
        content += `Date: ${date.toLocaleString()}\n`;
        content += `  Emotion: ${entry.emotion}\n`;
        content += `  Thought: ${entry.thought}\n`;
        if (entry.reframe) {
          content += `  Reframe: ${entry.reframe}\n`;
        }
        content += `\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mental-wellness-data-${startDate}-to-${endDate}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Data exported successfully');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
      <Button onClick={handleExport} className="gap-2">
        <Download className="w-4 h-4" />
        Export Data
      </Button>
      <p className="text-xs text-muted-foreground">
        Your data will be exported as a text file containing all mood and thought entries within the selected date
        range.
      </p>
    </div>
  );
}
