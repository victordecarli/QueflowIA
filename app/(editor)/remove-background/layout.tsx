import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queflow IA - Remover Fundo de Imagens',
  description: 'Remover fundos de imagens com nosso poderoso editor. Obtenha um fundo limpo e transparente para suas imagens em segundos.',
  keywords: 'remover fundo, remover fundo de imagem, fundo transparente, remover fundo, editar imagens online'
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
