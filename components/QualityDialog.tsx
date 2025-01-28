import * as React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

interface QualityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadLowQuality: () => void;
  onSignUp: () => void;
}

export function QualityDialog({
  isOpen,
  onClose,
  onDownloadLowQuality,
  onSignUp,
}: QualityDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="text-center">
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Want Premium Quality?
          </AlertDialogTitle>
          <div className="space-y-4 text-gray-500 dark:text-gray-400 text-center">
            <div>
              Want the best accuracy from our AI model and access to high-quality downloads? 
              Authenticate with Google to unlock premium features!
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 justify-center">
          <Button
            variant="outline"
            onClick={() => {
              onDownloadLowQuality();
              onClose();
            }}
          >
            Download Basic Version (JPEG)
          </Button>
          <Button
            onClick={() => {
              onSignUp();
              onClose();
            }}
          >
            Sign up for free
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
