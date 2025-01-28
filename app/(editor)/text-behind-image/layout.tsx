import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queflow IA - Adicionar Texto Atrás de Imagens',
  description: 'Adicione texto atrás de suas imagens com nosso editor fácil de usar. Ideal para criar designs únicos e composições.',
  keywords: 'texto atrás de imagem, editor de texto, sobreposição de texto, ferramenta de texto de imagem'
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
