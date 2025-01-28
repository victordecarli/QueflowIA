'use client';

import { TransformationPage } from '@/components/TransformationPage';

export default function ChangeBackgroundPage() {
  return (
    <TransformationPage
      title="Mudar Fundo"
      description="Mudar o fundo de suas imagens de forma instantânea. Substitua, modifique ou melhore o fundo de suas imagens com facilidade."
      beforeImage="/shirtbefore.jpg"
      afterImage="/shirtafter.jpg"
      beforeAlt="Imagem original com fundo"
      afterAlt="Imagem com fundo removido"
    />
  );
}
