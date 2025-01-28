import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queflow IA - Adicionar Formas Atrás de Imagens',
  description: 'Adicione formas atrás de suas imagens com nosso editor intuitivo. Crie designs impressionantes com formas geométricas.',
  keywords: 'formas atrás de imagem, editor de forma, sobreposição de forma, ferramenta de design de imagem'
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}