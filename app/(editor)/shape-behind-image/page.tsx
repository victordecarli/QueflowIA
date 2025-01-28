'use client';

import { TransformationPage } from '@/components/TransformationPage';

export default function ShapeBehindImagePage() {
  return (
    <TransformationPage
      title="Adicionar Formas Atrás de Imagens"
      description="Adicione formas geométricas e padrões atrás de suas imagens. Crie efeitos visuais impressionantes com formas e designs personalizáveis."
      beforeImage="/personbefore.jpg"
      afterImage="/personafter.jpg"
      beforeAlt="Imagem original sem formas"
      afterAlt="Imagem com formas atrás"
    />
  );
}
