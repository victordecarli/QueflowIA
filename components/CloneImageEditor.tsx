'use client';

import { useEditor } from '@/hooks/useEditor';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Copy, X, Expand, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

export function CloneImageEditor() {
  const {
    image,
    clonedForegrounds,
    addClonedForeground,
    removeClonedForeground,
    updateClonedForegroundTransform
  } = useEditor();

  if (!image.foreground) {
    return (
      <div className="p-4 text-center text-gray-500">
        Por favor, carregue uma imagem primeiro para usar a funcionalidade de clone.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        onClick={addClonedForeground}
        className="w-full"
        variant="default"
      >
        <Copy className="w-4 h-4 mr-2" />
        Adicionar Clone
      </Button>

      <div className="space-y-4">
        {clonedForegrounds.map((clone) => (
          <div key={clone.id} className="space-y-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Clone</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeClonedForeground(clone.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Posição Horizontal</label>
              <Slider
                value={[clone.position.x]}
                onValueChange={([x]) => updateClonedForegroundTransform(clone.id, {
                  position: { x, y: clone.position.y }
                })}
                min={-100}
                max={100}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Posição Vertical</label>
              <Slider
                value={[clone.position.y]}
                onValueChange={([y]) => updateClonedForegroundTransform(clone.id, {
                  position: { x: clone.position.x, y }
                })}
                min={-100}
                max={100}
                step={0.1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Expand className="w-4 h-4" /> Size
              </label>
              <Slider
                value={[clone.size]}
                onValueChange={([size]) => updateClonedForegroundTransform(clone.id, { size })}
                min={10}
                max={200}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <RotateCw className="w-4 h-4" /> Rotation
              </label>
              <Slider
                value={[clone.rotation]}
                onValueChange={([rotation]) => updateClonedForegroundTransform(clone.id, { rotation })}
                min={0}
                max={360}
                step={1}
              />
            </div>

            {/* Add Flip Controls */}
            <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`horizontal-flip-${clone.id}`}
                  checked={clone.flip.horizontal}
                  onCheckedChange={(checked) =>
                    updateClonedForegroundTransform(clone.id, {
                      flip: {
                        ...clone.flip,
                        horizontal: checked as boolean
                      }
                    })
                  }
                />
                <label
                  htmlFor={`horizontal-flip-${clone.id}`}
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <FlipHorizontal className="w-4 h-4" />
                  Virar Horizontal
                </label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id={`vertical-flip-${clone.id}`}
                  checked={clone.flip.vertical}
                  onCheckedChange={(checked) =>
                    updateClonedForegroundTransform(clone.id, {
                      flip: {
                        ...clone.flip,
                        vertical: checked as boolean
                      }
                    })
                  }
                />
                <label
                  htmlFor={`vertical-flip-${clone.id}`}
                  className="text-sm font-medium flex items-center gap-1"
                >
                  <FlipVertical className="w-4 h-4" />
                  Virar Vertical
                </label>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
