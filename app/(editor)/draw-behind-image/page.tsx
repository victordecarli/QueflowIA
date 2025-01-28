'use client';

import { TransformationPage } from '@/components/TransformationPage';

export default function DrawBehindImagePage() {
  return (
    <TransformationPage
      title="Desenhar Atrás de Imagens"
      description="Crie desenhos e efeitos personalizados atrás de suas imagens."
      beforeImage="/drawbefore.jpg"
      afterImage="/drawafter.jpeg"
      beforeAlt="Imagem original"
      afterAlt="Imagem com desenhos personalizados atrás"
    />
  );
}
