'use client';

import { useEditor } from '@/hooks/useEditor';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRESET_COLORS = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFA500', // Orange
  '#800080', // Purple
  '#FFC0CB', // Pink
  '#4A90E2', // Sky Blue
  '#50E3C2', // Mint
  '#F5A623', // Gold
  '#D0021B', // Dark Red
];

export function ChangeBackgroundEditor() {
  const {
    changeBackground,
    resetBackground,
    hasChangedBackground,
    foregroundPosition,
    updateForegroundPosition,
    isProcessing,
    setBackgroundColor,
    backgroundColor,
    foregroundSize,
    updateForegroundSize,
    image  // Add this line
  } = useEditor();

  const handleColorSelect = (color: string | null) => {
    setBackgroundColor(color);
  };

  return (
    <div className="space-y-6">
      {/* Background Colors */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cor do Fundo</label>
          <div className="grid grid-cols-6 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={cn(
                  "w-8 h-8 rounded-md border-2 transition-all",
                  (backgroundColor === color && !image.background)  // Now image is defined
                    ? "border-blue-500 scale-110"
                    : "border-gray-200 dark:border-gray-700 hover:scale-105"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            <button
              onClick={() => handleColorSelect(null)}
              className={cn(
                "w-8 h-8 rounded-md border-2 transition-all flex items-center justify-center",
                (!backgroundColor && !image.background)
                  ? "border-blue-500 scale-110"
                  : "border-gray-200 dark:border-gray-700 hover:scale-105"
              )}
              title="Reset to original"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-950 px-2 text-gray-500">ou</span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Carregue uma imagem para usar como fundo
          </p>
          <Button
            onClick={changeBackground}
            className="w-full"
            variant={hasChangedBackground ? "secondary" : "default"}
            disabled={isProcessing}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isProcessing ? 'Processando...' : 'Carregar Imagem de Fundo'}
          </Button>
        </div>
      </div>

      {/* Show controls when background is changed or color is selected */}
      {(hasChangedBackground || backgroundColor) && (
        <div className="space-y-4">
          {/* Foreground Size Control */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Tamanho do Fundo</label>
            <Slider
              value={[foregroundSize]}
              onValueChange={([value]) => updateForegroundSize(value)}
              min={10}
              max={200}
              step={1}
            />
            <div className="text-xs text-gray-500 text-right">
              {foregroundSize}%
            </div>
          </div>

          {/* Position controls */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Posição Horizontal</label>
            <Slider
              value={[foregroundPosition.x]}
              onValueChange={([value]) => updateForegroundPosition({ x: value, y: foregroundPosition.y })}
              min={-100}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Posição Vertical</label>
            <Slider
              value={[foregroundPosition.y]}
              onValueChange={([value]) => updateForegroundPosition({ x: foregroundPosition.x, y: value })}
              min={-100}
              max={100}
              step={1}
            />
          </div>

          <Button
            onClick={resetBackground}
            variant="outline"
            className="w-full"
            // Enable button if background is changed or color is selected
            disabled={!hasChangedBackground && !backgroundColor}
          >
            Resetar Fundo
          </Button>
        </div>
      )}
    </div>
  );
}
