import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queflow IA - Desenhar Atrás de Imagens',
  description: 'Desenhe atrás de objetos em suas imagens com IA',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}