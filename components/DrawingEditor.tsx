'use client';

import { useEditor } from '@/hooks/useEditor';
import { Undo, Trash2, Pencil } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ColorInput } from './ColorInput';
import { cn } from '@/lib/utils';

export function DrawingEditor() {
  const {
    isDrawingMode,
    drawingSize,
    drawingColor,
    drawings,
    setIsDrawingMode,
    setDrawingSize,
    setDrawingColor,
    clearDrawings,
    undoLastDrawing,
  } = useEditor();

  return (
    <div className="space-y-3">
      {/* Drawing Mode Toggle */}
      <div className="flex items-center gap-3 mb-3">
        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Drawing Mode</Label>
        <button
          onClick={() => setIsDrawingMode(!isDrawingMode)}
          className={cn(
            "p-2 rounded-lg border transition-all flex items-center justify-center",
            isDrawingMode
              ? "border-primary bg-primary/10 text-primary"
              : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
          )}
        >
          <Pencil className="w-5 h-5" />
        </button>
      </div>

      {/* Controls Section */}
      <div className="space-y-3 bg-gray-50 dark:bg-white/5 rounded-lg p-3">
        {/* Size Control */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Tamanho do Pincel
          </Label>
          <Slider
            min={1}
            max={500}
            step={1}
            value={[drawingSize]}
            onValueChange={([value]) => setDrawingSize(value)}
            className="my-1.5"
          />
          <div className="text-xs text-gray-500 text-right">{drawingSize}px</div>
        </div>

        {/* Color Picker */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Cor
          </Label>
          <ColorInput
            id="drawing-color"
            value={drawingColor}
            onChange={setDrawingColor}
          />
        </div>
      </div>

      {/* Action Buttons */}
      {drawings.length > 0 && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              undoLastDrawing();
              // Force a re-render of the canvas immediately
              setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
            }}
            className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <Undo className="w-4 h-4" />
            <span className="text-sm font-medium">Undo</span>
          </button>
          <button
            onClick={() => {
              clearDrawings();
              // Force a re-render of the canvas immediately
              setTimeout(() => window.dispatchEvent(new Event('resize')), 0);
            }}
            className="flex-1 p-3 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Clear All</span>
          </button>
        </div>
      )}
    </div>
  );
}
