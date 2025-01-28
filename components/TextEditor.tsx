'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useEditor } from '@/hooks/useEditor';
import { FONT_OPTIONS, FONT_WEIGHTS } from '@/constants/fonts';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlowEffect } from '@/types/editor';
import { useDebounce } from '@/hooks/useDebounce';
import { ColorInput } from './ColorInput';
import { cn } from '@/lib/utils';

// Helper function for smooth scrolling
const scrollToElement = (element: HTMLElement | null) => {
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export function TextEditor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { textSets, updateTextSet, removeTextSet } = useEditor();
  const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({});
  const [fontSearch, setFontSearch] = useState('');

  const debouncedUpdateText = useDebounce((id: number, updates: any) => {
    updateTextSet(id, updates);
  }, 16);

  const handlePositionChange = useCallback((id: number, type: 'horizontal' | 'vertical', value: number) => {
    const textSet = textSets.find(set => set.id === id);
    if (!textSet) return;

    updateTextSet(id, {
      position: {
        vertical: type === 'vertical' ? Math.round(value * 10) / 10 : textSet.position.vertical,
        horizontal: type === 'horizontal' ? Math.round(value * 10) / 10 : textSet.position.horizontal
      }
    });
  }, [textSets, updateTextSet]);

  // Auto-scroll to new text layer
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const lastElement = container.lastElementChild;
      scrollToElement(lastElement as HTMLElement);
    }
  }, [textSets.length]);

  // Auto-open new accordions
  useEffect(() => {
    const newOpenState: Record<number, boolean> = {};
    textSets.forEach(set => {
      newOpenState[set.id] = openAccordions[set.id] !== false;
    });
    setOpenAccordions(newOpenState);
  }, [textSets.length]);

  const toggleAccordion = (id: number) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div ref={containerRef} className="space-y-4"> {/* Increased gap between items */}
      {textSets.map((textSet) => (
        <div 
          key={textSet.id} 
          className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-lg shadow-md dark:shadow-lg dark:shadow-black/20 p-4 space-y-4"
        >
          {/* Text Input */}
          <Input
            id={`text-input-${textSet.id}`}
            name={`text-input-${textSet.id}`}
            value={textSet.text}
            onChange={(e) => updateTextSet(textSet.id, { text: e.target.value })}
            className={cn(
              "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white",
              "text-base sm:text-base" // Add responsive font size
            )}
            placeholder="Enter text..."
            autoComplete="off" // Add this to prevent autocomplete zoom
            spellCheck="false" // Add this to prevent spellcheck zoom
            style={{ fontSize: '16px' }}
          />
          
          {/* Font Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label asChild>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Select
                    value={textSet.fontFamily}
                    onValueChange={(value) => updateTextSet(textSet.id, { fontFamily: value })}
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent 
                      className="max-h-[400px] overflow-y-auto bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white w-[280px]"
                    >
                      <div className="pt-2">
                        {FONT_OPTIONS
                          .filter(font => 
                            font.name.toLowerCase().includes(fontSearch.toLowerCase())
                          )
                          .map((font) => (
                            <SelectItem 
                              key={font.value} 
                              value={font.value}
                              className="focus:bg-gray-100 dark:focus:bg-white/10 focus:text-gray-900 dark:focus:text-white h-10 text-gray-900 dark:text-white data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-white/10"
                              style={{ fontFamily: font.value }}
                            >
                              {font.name}
                            </SelectItem>
                          ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>
              </Label>
            </div>

            <div>
              <Label asChild>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Select
                    value={textSet.fontWeight}
                    onValueChange={(value) => updateTextSet(textSet.id, { fontWeight: value })}
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                      <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white">
                      {FONT_WEIGHTS.map((weight) => (
                        <SelectItem 
                          key={weight.value} 
                          value={weight.value}
                          className="focus:bg-gray-100 dark:focus:bg-white/10 focus:text-gray-900 dark:focus:text-white data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-white/10"
                        >
                          {weight.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Label>
            </div>
          </div>

          {/* Text Size */}
          <div className="space-y-2">
            <Label asChild>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                Text Size
                <span>{textSet.fontSize}px</span>
              </div>
            </Label>
            <Slider
              min={12}
              max={2000}
              value={[textSet.fontSize]}
              onValueChange={([value]) => updateTextSet(textSet.id, { fontSize: value })}
              className="mt-2"
            />
          </div>

          {/* Color */}
          <div>
            <Label asChild>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <ColorInput
                  id={`text-color-${textSet.id}`}
                  value={textSet.color} 
                  onChange={(value) => updateTextSet(textSet.id, { color: value })}
                />
              </div>
            </Label>
          </div>

          {/* Opacity */}
          <div className="space-y-2">
            <Label asChild>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                Opacity
                <span>{Math.round(textSet.opacity * 100)}%</span>
              </div>
            </Label>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[textSet.opacity]}
              onValueChange={([value]) => updateTextSet(textSet.id, { opacity: value })}
            />
          </div>

          {/* Position Controls */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label asChild>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  Horizontal Position
                  <span>{textSet.position.horizontal}%</span>
                </div>
              </Label>
              <Slider
                min={0}
                max={100}
                step={0.1} // Smaller step for smoother updates
                value={[textSet.position.horizontal]}
                onValueChange={([value]) => handlePositionChange(textSet.id, 'horizontal', value)}
              />
            </div>

            <div className="space-y-2">
              <Label asChild>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  Vertical Position
                  <span>{textSet.position.vertical}%</span>
                </div>
              </Label>
              <Slider
                min={0}
                max={100}
                step={0.1}
                value={[textSet.position.vertical]}
                onValueChange={([value]) => handlePositionChange(textSet.id, 'vertical', value)}
              />
            </div>
          </div>

          {/* Rotation */}
          <div className="space-y-2">
            <Label asChild>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                Rotation
                <span>{textSet.rotation}°</span>
              </div>
            </Label>
            <Slider
              min={-180}
              max={180}
              value={[textSet.rotation]}
              onValueChange={([value]) => updateTextSet(textSet.id, { rotation: value })}
            />
          </div>

          {/* Glow Effect Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Label asChild>
                <div className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-400">
                  Enable Glow
                  <Switch
                    checked={textSet.glow?.enabled ?? false}
                    onCheckedChange={(checked) => {
                      const newGlow: GlowEffect = {
                        enabled: checked,
                        color: textSet.glow?.color || '#ffffff',
                        intensity: textSet.glow?.intensity || 20
                      };
                      updateTextSet(textSet.id, { glow: newGlow });
                    }}
                  />
                </div>
              </Label>
            </div>

            {textSet.glow?.enabled && (
              <>
                {/* Glow Color */}
                <div>
                  <Label asChild>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <ColorInput
                        id={`text-glow-${textSet.id}`}
                        value={textSet.glow.color} 
                        onChange={(value) => {
                          const newGlow: GlowEffect = {
                            ...textSet.glow!, 
                            color: value
                          };
                          updateTextSet(textSet.id, { glow: newGlow });
                        }}
                      />
                    </div>
                  </Label>
                </div>

                <div className='space-y-2'>
                  <Label asChild>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      Glow Intensity
                      <span>{textSet.glow.intensity}</span>
                    </div>
                  </Label>
                  <Slider
                    min={0}
                    max={50}
                    value={[textSet.glow.intensity]}
                    onValueChange={([value]) => {
                      const newGlow: GlowEffect = {
                        ...textSet.glow!,
                        intensity: value
                      };
                      updateTextSet(textSet.id, { glow: newGlow });
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Delete button */}
          <button
            onClick={() => removeTextSet(textSet.id)}
            className="w-full p-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-500/20"
          >
            Delete Layer
          </button>
        </div>
      ))}
    </div>
  );
}
