'use client';

import { TransformationPage } from '@/components/TransformationPage';

export default function RemoveBackgroundPage() {
  return (
    <TransformationPage
      title="Remover Fundo de Imagens"
      description="Remover fundos de suas imagens com precisão. Ideal para criar fotos profissionais de produtos e retratos."
      beforeImage="/shirtbefore.jpg"
      afterImage="/shirtafter.jpg"
      beforeAlt="Imagem original com fundo"
      afterAlt="Imagem com fundo removido"
    />
  );
}
