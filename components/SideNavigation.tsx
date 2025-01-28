'use client';

import React, { JSX } from 'react';
import { Type, Shapes, Plus, ImageIcon, Image, Copy, Images, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { TextEditor } from './TextEditor';
import { ShapeEditor } from './ShapeEditor';
import { RemoveBackgroundEditor } from './RemoveBackgroundEditor';
import { useEditor } from '@/hooks/useEditor';
import { ChangeBackgroundEditor } from './ChangeBackgroundEditor';
import { CloneImageEditor } from './CloneImageEditor';
import { useEditorPanel } from '@/contexts/EditorPanelContext';
import { ImageEditor } from './ImageEditor';
import { DrawingEditor } from './DrawingEditor';

type TabType = 'text' | 'shapes' | 'remove-background' | 'change-background' | 'clone-image' | 'images' | 'draw' | null;

interface SideNavigationProps {
  mobile?: boolean;
  mode?: 'full' | 'text-only' | 'shapes-only' | 'remove-background-only' | 'change-background-only' | 'clone-image-only' | 'draw-only' | 'overlay-only';
}

export function SideNavigation({ mobile = false, mode = 'full' }: SideNavigationProps) {
  // Update the getInitialTab function to return the correct type
  const getInitialTab = (): TabType => {
    switch (mode) {
      case 'text-only':
        return 'text';
      case 'shapes-only':
        return 'shapes';
      case 'remove-background-only':
        return 'remove-background';
      case 'change-background-only':
        return 'change-background';
      case 'clone-image-only':
        return 'clone-image';
      case 'draw-only':
        return 'draw';
      case 'overlay-only':
        return 'images';
      default:
        return null;
    }
  };

  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab());
  const {
    image,
    isProcessing,
    isConverting,
    addTextSet,
    addShapeSet,
    isBackgroundRemoved
  } = useEditor();
  const canAddLayers = !!image.original &&
    !!image.background &&
    !isProcessing &&
    !isConverting &&
    !isBackgroundRemoved;  // Add this condition
  const { setIsPanelOpen } = useEditorPanel();

  // Get appropriate message based on active tab
  const getUploadMessage = () => {
    if (!image.original) {
      switch (activeTab) {
        case 'text':
          return 'Por favor, carregue uma imagem primeiro para adicionar texto atrás de objetos';
        case 'shapes':
          return 'Por favor, carregue uma imagem primeiro para adicionar formas atrás de objetos';
        case 'remove-background':
          return 'Por favor, carregue uma imagem primeiro para remover o fundo';
        case 'change-background':
          return 'Por favor, carregue uma imagem primeiro para mudar o fundo';
        case 'clone-image':
          return 'Por favor, carregue uma imagem primeiro para usar a funcionalidade de clonar';
        case 'draw':
          return 'Por favor, carregue uma imagem primeiro para usar a funcionalidade de desenhar';
        default:
          return 'Por favor, carregue uma imagem primeiro';
      }
    }
    return null;
  };

  const showTextButton = mode === 'full' || mode === 'text-only';
  const showShapesButton = mode === 'full' || mode === 'shapes-only';
  const showRemoveBackground = mode === 'full' || mode === 'remove-background-only';
  const showChangeBackground = mode === 'full' || mode === 'change-background-only';
  const showCloneImage = mode === 'full' || mode === 'clone-image-only';
  const showSmartOverlay = mode === 'full' || mode === 'overlay-only'; // Add this line - only show in full mode
  const showDrawButton = mode === 'full' || mode === 'draw-only'; // Add this line

  // Add effect to handle body class for mobile slide up
  useEffect(() => {
    setIsPanelOpen(mobile && activeTab !== null);
  }, [mobile, activeTab, setIsPanelOpen]);

  // If we're in remove-background-only mode, set it as initial active tab
  useEffect(() => {
    if (mode === 'remove-background-only') {
      setActiveTab('remove-background');
    } else if (mode === 'change-background-only') {
      setActiveTab('change-background');
    } else if (mode === 'clone-image-only') {
      setActiveTab('clone-image');
    } else if (mode === 'draw-only') {
      setActiveTab('draw');
    }
  }, [mode]);

  // Helper function to determine if we should show the "Add" button
  const shouldShowAddButton = (activeTab: string) => {
    return activeTab !== 'remove-background' && canAddLayers;
  };

  // Add this new function to determine if a tab should be disabled
  const isTabDisabled = (tabName: TabType) => {
    if (!image.original || isProcessing || isConverting) return true;
    if (isBackgroundRemoved && tabName !== 'change-background') return true;
    return false;
  };

  // Update the button rendering to use the new isTabDisabled function
  const renderTabButton = (tabName: TabType, icon: JSX.Element, label: string) => (
    <button
      onClick={() => setActiveTab(activeTab === tabName ? null : tabName)}
      className={cn(
        mobile ? "flex-1 p-2" : "p-3",
        "rounded-lg flex flex-col items-center gap-0.5 transition-colors",
        activeTab === tabName
          ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
        isTabDisabled(tabName) && "opacity-50 cursor-not-allowed"
      )}
      disabled={isTabDisabled(tabName)}
    >
      {icon}
      <span className={cn(
        mobile ? "text-[10px]" : "text-xs",
        "font-medium"
      )}>{label}</span>
    </button>
  );

  const changeBackgroundButton = (
    showChangeBackground && renderTabButton(
      'change-background' as TabType,
      <Image className={mobile ? "w-4 h-4" : "w-5 h-5"} />,
      'Mudar Fundo'
    )
  );

  // Add clone image button
  const cloneImageButton = (
    showCloneImage && renderTabButton(
      'clone-image' as TabType,
      <Copy className={mobile ? "w-4 h-4" : "w-5 h-5"} />,
      'Clonar Imagem'
    )
  );

  const renderMobileNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-white/10 p-1.5 z-50 overflow-x-auto">
      <div className="flex gap-2 min-w-fit px-2">  {/* Changed from max-w-md mx-auto to min-w-fit px-2 */}
        {showSmartOverlay && renderTabButton('images', <Images className="w-4 h-4" />, 'Sobreposição')}
        {cloneImageButton}
        {showRemoveBackground && renderTabButton('remove-background', <ImageIcon className="w-4 h-4" />, 'Remover Fundo')}
        {changeBackgroundButton}
        {showDrawButton && renderTabButton('draw', <Pencil className="w-4 h-4" />, 'Desenhar')}
        {showTextButton && renderTabButton('text', <Type className="w-4 h-4" />, 'Texto')}
        {showShapesButton && renderTabButton('shapes', <Shapes className="w-4 h-4" />, 'Formas')}
      </div>
    </div>
  );

  const renderDesktopNavigation = () => (
    <div className="w-[80px] border-r border-gray-200 dark:border-white/10 flex flex-col gap-1 p-2">
      {showSmartOverlay && renderTabButton('images', <Images className="w-5 h-5" />, 'Sobreposição')}
      {cloneImageButton}
      {changeBackgroundButton}
      {showRemoveBackground && renderTabButton('remove-background', <ImageIcon className="w-5 h-5" />, 'Remover Fundo ')}
      {showDrawButton && renderTabButton('draw', <Pencil className="w-5 h-5" />, 'Desenhar')}
      {showTextButton && renderTabButton('text', <Type className="w-5 h-5" />, 'Texto')}
      {showShapesButton && renderTabButton('shapes', <Shapes className="w-5 h-5" />, 'Formas')}
    </div>
  );

  if (mobile) {
    return (
      <>
        {renderMobileNavigation()}

        {/* Mobile Slide-up Editor Panel */}
        {activeTab && (
          <div className={cn(
            "fixed inset-x-0 bottom-[56px] bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-white/10 rounded-t-xl z-40 flex flex-col shadow-2xl",
            "transition-all duration-300 ease-in-out",
            "max-h-[35vh]" // Slightly increased height for better spacing
          )}>
            <div className="sticky top-0 bg-white dark:bg-zinc-950 p-2.5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
              {(activeTab === 'text' || activeTab === 'shapes') ? (
                <button
                  onClick={() => activeTab === 'text' ? addTextSet() : addShapeSet('square')}
                  disabled={!canAddLayers}
                  className="flex-1 p-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar {activeTab === 'text' ? 'Text' : 'Shape'}</span>
                </button>
              ) : (
                <h3 className="text-lg font-semibold">
                  {activeTab === 'remove-background' ? 'Remover Fundo' : ''}
                  {activeTab === 'change-background' ? 'Mudar Fundo' : ''}
                  {activeTab === 'clone-image' ? 'Clonar Imagem' : ''}
                </h3>)
              }

              {/* Add close button */}
              <button
                onClick={() => setActiveTab(null)}
                className="ml-3 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white text-right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="space-y-3 p-3 pb-12 [&_*]:text-sm [&_input]:h-8 [&_button]:h-8 [&_select]:h-8">
                {/* Increased bottom padding to pb-12 */}
                {/* This wrapper adds mobile-optimized styles to all child elements */}
                {getUploadMessage() ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <p className="text-gray-400 text-sm">{getUploadMessage()}</p>
                  </div>
                ) : (
                  <>
                    {activeTab === 'text' && <TextEditor />}
                    {activeTab === 'shapes' && <ShapeEditor />}
                    {activeTab === 'remove-background' && <RemoveBackgroundEditor />}
                    {activeTab === 'change-background' && <ChangeBackgroundEditor />}
                    {activeTab === 'clone-image' && <CloneImageEditor />}
                    {activeTab === 'images' && <ImageEditor />}
                    {activeTab === 'draw' && <DrawingEditor />}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={cn(
      "fixed left-0 top-16 bottom-0 flex h-[calc(100vh-4rem)] z-50 border-r border-t border-gray-200 dark:border-white/10",
      // Increase the width of the expanded panel
      activeTab ? "w-[360px]" : "w-[80px]"
    )}>
      {/* Side Navigation Bar */}
      <div className="flex h-full bg-white dark:bg-zinc-950">
        {/* Increase the width of the navigation buttons */}
        {renderDesktopNavigation()}

        {/* Editor Content with border */}
        {activeTab && (
          <div className="w-[280px] border-r border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-950 flex flex-col">
            <div className="sticky top-0 bg-white dark:bg-zinc-950 p-4 border-b border-gray-200 dark:border-white/10 z-10">
              {(activeTab === 'text' || activeTab === 'shapes') && canAddLayers ? (
                <button
                  onClick={() => activeTab === 'text' ? addTextSet() : addShapeSet('square')}
                  disabled={!canAddLayers}
                  className="w-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar {activeTab === 'text' ? 'Texto' : 'Forma'}</span>
                </button>
              ) : (
                <h3 className="text-lg font-semibold">
                  {activeTab === 'remove-background' ? 'Remover Fundo' :
                    activeTab === 'images' ? 'Sobreposição Inteligente' :
                      activeTab === 'change-background' ? 'Mudar Fundo' :
                        activeTab === 'clone-image' ? 'Clonar Imagem' :
                          activeTab === 'text' ? 'Adicionar Texto' :
                            activeTab === 'draw' ? 'Desenhar' :
                              'Adicionar Formas'}
                </h3>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 h-full">
              {getUploadMessage() ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                  <p className="text-gray-400 mb-4">{getUploadMessage()}</p>
                </div>
              ) : (
                <>
                  {activeTab === 'text' && <TextEditor />}
                  {activeTab === 'shapes' && <ShapeEditor />}
                  {activeTab === 'remove-background' && <RemoveBackgroundEditor />}
                  {activeTab === 'change-background' && <ChangeBackgroundEditor />}
                  {activeTab === 'clone-image' && <CloneImageEditor />}
                  {activeTab === 'images' && <ImageEditor />}
                  {activeTab === 'draw' && <DrawingEditor />}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}