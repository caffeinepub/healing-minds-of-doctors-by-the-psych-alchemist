import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';

interface DistressPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateToCrisis: () => void;
}

export default function DistressPromptDialog({
  open,
  onOpenChange,
  onNavigateToCrisis,
}: DistressPromptDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-orange-500/10">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
            <AlertDialogTitle>We're here for you</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base leading-relaxed">
            It sounds like you might be going through a difficult time. Would you like to access our crisis resources for immediate support?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue</AlertDialogCancel>
          <AlertDialogAction onClick={onNavigateToCrisis}>
            Go to Crisis Resources
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
