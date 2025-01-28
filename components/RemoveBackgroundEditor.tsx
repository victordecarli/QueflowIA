'use client';

import { useEditor } from '@/hooks/useEditor';
import { Button } from '@/components/ui/button';

export function RemoveBackgroundEditor() {
  const { removeBackground, resetBackground, hasTransparentBackground } = useEditor();

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Remove the background from your image.
      </p>
      <div className="space-y-2">
        <Button
          onClick={removeBackground}
          className="w-full"
          variant={hasTransparentBackground ? "secondary" : "default"}
        >
          {hasTransparentBackground ? 'Background Removed' : 'Remove Background'}
        </Button>
        <Button
          onClick={resetBackground}
          variant="outline"
          className="w-full"
          disabled={!hasTransparentBackground}
        >
          Reset Background
        </Button>
      </div>
    </div>
  );
}
