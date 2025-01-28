'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface EditorPanelContextType {
  isPanelOpen: boolean;
  setIsPanelOpen: (isOpen: boolean) => void;
}

const EditorPanelContext = createContext<EditorPanelContextType | undefined>(undefined);

export function EditorPanelProvider({ children }: { children: ReactNode }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <EditorPanelContext.Provider value={{ isPanelOpen, setIsPanelOpen }}>
      {children}
    </EditorPanelContext.Provider>
  );
}

export function useEditorPanel() {
  const context = useContext(EditorPanelContext);
  if (context === undefined) {
    throw new Error('useEditorPanel deve ser usado dentro de um EditorPanelProvider');
  }
  return context;
}
