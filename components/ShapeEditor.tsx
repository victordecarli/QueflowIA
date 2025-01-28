'use client';

import { useEditor } from '@/hooks/useEditor';
import { Trash2, Copy, GripVertical, ChevronDown } from 'lucide-react';
import { SHAPES } from '@/constants/shapes';
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef, useCallback } from 'react';
import { GlowEffect } from '@/types/editor';
import { useDebounce } from '@/hooks/useDebounce';
import { ColorInput } from './ColorInput';

export function ShapeEditor() {
  const { shapeSets, updateShapeSet, removeShapeSet } = useEditor();
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({});
  const shapeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const debouncedUpdateShape = useDebounce((id: number, updates: any) => {
    updateShapeSet(id, updates);
  }, 16);

  const handlePositionChange = useCallback((id: number, type: 'horizontal' | 'vertical', value: number) => {
    debouncedUpdateShape(id, {
      position: {
        ...shapeSets.find(set => set.id === id)?.position,
        [type]: value
      }
    });
  }, [shapeSets, debouncedUpdateShape]);

  // Auto-open new accordions
  useEffect(() => {
    const newOpenState: Record<number, boolean> = {};
    shapeSets.forEach(set => {
      newOpenState[set.id] = openAccordions[set.id] !== false;
    });
    setOpenAccordions(newOpenState);
  }, [shapeSets.length]);

  // Auto-scroll to new shape
  useEffect(() => {
    const lastShape = shapeSets[shapeSets.length - 1];
    if (lastShape && shapeRefs.current[lastShape.id]) {
      shapeRefs.current[lastShape.id]?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shapeSets.length]);

  const toggleAccordion = (id: number) => {
    setOpenAccordions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Existing Shapes Section */}
      {shapeSets.map((shapeSet) => {
        const shapeName = SHAPES.find(s => s.value === shapeSet.type)?.name || 'Shape';
        return (
          <div 
            key={shapeSet.id} 
            ref={el => { shapeRefs.current[shapeSet.id] = el; }}
            className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-lg shadow-md dark:shadow-lg dark:shadow-black/20 p-4 space-y-4"
          >
            {/* Shape Type Selection */}
            <div className="mt-4">
              <Label asChild>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Select
                    value={shapeSet.type}
                    onValueChange={(value) => updateShapeSet(shapeSet.id, { type: value })}
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      {SHAPES.map((shape) => (
                        <SelectItem 
                          key={shape.value} 
                          value={shape.value}
                          className="focus:bg-white/10 focus:text-white"
                        >
                          {shape.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Label>
            </div>

            {/* Fill Toggle */}
            <div className="flex items-center justify-between gap-4">
              <Label className="text-sm text-gray-600 dark:text-gray-400">Fill Shape</Label>
              <Switch
                checked={shapeSet.isFilled}
                onCheckedChange={(checked) => 
                  updateShapeSet(shapeSet.id, { isFilled: checked })
                }
              />
            </div>

            {/* Color */}
            <div>
              <Label asChild>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <ColorInput
                    id={`shape-color-${shapeSet.id}`}
                    value={shapeSet.color} 
                    onChange={(value) => updateShapeSet(shapeSet.id, { color: value })} 
                  />
                </div>
              </Label>
            </div>

            {/* Size control */}
            <div className="space-y-2">
              <Label asChild>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  Size
                  <span>{shapeSet.scale}%</span>
                </div>
              </Label>
              <Slider
                min={1}
                max={2000}
                value={[shapeSet.scale]}
                onValueChange={([value]) => debouncedUpdateShape(shapeSet.id, { scale: value })}
                className="mt-2"
              />
            </div>

            {/* Stroke Width */}
            {!shapeSet.isFilled && (
              <div className="space-y-2">
                <Label asChild>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    Stroke Width
                    <span>{shapeSet.strokeWidth || 2}px</span>
                  </div>
                </Label>
                <Slider
                  min={0.1}
                  max={20}
                  step={0.2}
                  value={[shapeSet.strokeWidth || 2]}
                  onValueChange={([value]) => updateShapeSet(shapeSet.id, { strokeWidth: value })}
                />
              </div>
            )}

            {/* Position X */}
            <div className="space-y-2">
              <Label asChild>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  Horizontal Position
                  <span>{shapeSet.position.horizontal}%</span>
                </div>
              </Label>
              <Slider
                min={0}
                max={100}
                step={0.1}
                value={[shapeSet.position.horizontal]}
                onValueChange={([value]) => handlePositionChange(shapeSet.id, 'horizontal', value)}
              />
            </div>

            {/* Position Y */}
            <div className="space-y-2">
              <Label asChild>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  Vertical Position
                  <span>{shapeSet.position.vertical}%</span>
                </div>
              </Label>
              <Slider
                min={0}
                max={100}
                step={0.1}
                value={[shapeSet.position.vertical]}
                onValueChange={([value]) => handlePositionChange(shapeSet.id, 'vertical', value)}
              />
            </div>

            {/* Rotation */}
            <div className="space-y-2">
              <Label asChild>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  Rotation
                  <span>{shapeSet.rotation}°</span>
                </div>
              </Label>
              <Slider
                min={-180}
                max={180}
                value={[shapeSet.rotation]}
                onValueChange={([value]) => updateShapeSet(shapeSet.id, { rotation: value })}
              />
            </div>

            {/* Glow Effect Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Label asChild>
                  <div className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-400">
                    Enable Glow
                    <Switch
                      checked={shapeSet.glow?.enabled ?? false}
                      onCheckedChange={(checked) => {
                        const newGlow: GlowEffect = {
                          enabled: checked,
                          color: shapeSet.glow?.color || '#ffffff',
                          intensity: shapeSet.glow?.intensity || 20
                        };
                        updateShapeSet(shapeSet.id, { glow: newGlow });
                      }}
                    />
                  </div>
                </Label>
              </div>

              {shapeSet.glow?.enabled && (
                <>
                  {/* Glow Color */}
                  <div>
                    <Label asChild>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <ColorInput
                          id={`shape-glow-${shapeSet.id}`}
                          value={shapeSet.glow.color} 
                          onChange={(value) => {
                            const newGlow: GlowEffect = {
                              ...shapeSet.glow!, 
                              color: value
                            };
                            updateShapeSet(shapeSet.id, { glow: newGlow });
                          }}
                        />
                      </div>
                    </Label>
                  </div>

                  {/* Glow Intensity */}
                  <div className="space-y-2">
                    <Label asChild>
                      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                        Glow Intensity
                        <span>{shapeSet.glow.intensity}</span>
                      </div>
                    </Label>
                    <Slider
                      min={0}
                      max={50}
                      value={[shapeSet.glow.intensity]}
                      onValueChange={([value]) => {
                        const newGlow: GlowEffect = {
                          ...shapeSet.glow!,
                          intensity: value
                        };
                        updateShapeSet(shapeSet.id, { glow: newGlow });
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Delete button at the end */}
            <button
              onClick={() => removeShapeSet(shapeSet.id)}
              className="w-full p-2 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20"
            >
              Delete Shape
            </button>
          </div>
        );
      })}
    </div>
  );
}
