'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { openInBrowser } from '@/lib/browserDetect';

interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SaveDialog({ isOpen, onClose }: SaveDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Open in Browser to Save</DialogTitle>
          <DialogDescription>
            To save your changes, you'll need to open this editor in a browser like Chrome or Safari.
            Your work will be preserved when you switch.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            onClick={openInBrowser}
            className="w-full"
          >
            Open in Browser
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full"
          >
            Continue Editing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
