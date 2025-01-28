import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Troque o Fundo da Sua Foto - Queflow IA',
  description: 'Troque o fundo das suas fotos de um jeito fácil e rápido. Só fazer o upload, escolher um novo fundo e pronto: visuais incríveis em poucos cliques!',
  keywords: 'mudar fundo, editor de fundo de imagem, substituir fundo de imagem, ferramenta para mudar fundo, editar imagens online, queflow, remove fundo'
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
