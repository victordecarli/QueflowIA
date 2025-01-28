'use client';

import { TransformationPage } from '@/components/TransformationPage';

export default function CloneImagePage() {
  return (
    <TransformationPage
      title="Clonar Imagem"
      description="Clonar imagens de forma fácil e rápida. Adicione múltiplas cópias, posicione-as exatamente onde você quer e crie designs incríveis de forma simples."
      beforeImage="/applebefore.jpg"
      afterImage="/appleafter.jpeg"
      beforeAlt="Imagem original antes da clonagem"
      afterAlt="Imagem depois da clonagem"
    />
  );
}
