import { useGetSelfCareReminders } from '../../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InAppReminderBanner() {
  const { data: reminders = [] } = useGetSelfCareReminders();
  const [showReminder, setShowReminder] = useState(false);
  const [currentReminder, setCurrentReminder] = useState<string>('');

  useEffect(() => {
    if (reminders.length === 0) return;

    const checkReminders = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      for (const reminder of reminders) {
        if (Math.abs(currentMinutes - reminder.time) < 5) {
          const hours = Math.floor(reminder.time / 60);
          const minutes = reminder.time % 60;
          const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          setCurrentReminder(`Time for your self-care check-in (${timeStr})`);
          setShowReminder(true);
          break;
        }
      }
    };

    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminders]);

  if (!showReminder) return null;

  return (
    <Alert className="mb-6 bg-primary/10 border-primary/20">
      <Bell className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{currentReminder}</span>
        <Button variant="ghost" size="sm" onClick={() => setShowReminder(false)}>
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
