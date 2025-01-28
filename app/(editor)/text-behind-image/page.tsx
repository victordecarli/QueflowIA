'use client';

import { EditorLayout } from '@/components/EditorLayout';
import { SideNavigation } from '@/components/SideNavigation';
import { useEditor } from '@/hooks/useEditor';
import { useEffect } from 'react';
import { TransformationPage } from '@/components/TransformationPage';

export default function TextBehindImagePage() {
  return (
    <TransformationPage
      title="Adicionar Texto Atrás de Imagens"
      description="Adicione efeitos de texto impressionantes atrás de suas imagens."
      beforeImage="/povbefore.jpg"
      afterImage="/povafter.jpg"
      beforeAlt="Imagem original sem texto atrás"
      afterAlt="Imagem com efeito de texto atrás"
    />
  );
}
