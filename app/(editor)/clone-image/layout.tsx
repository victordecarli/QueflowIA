import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queflow IA - Clone Image',
  description: 'Clone imagens de forma fácil e rápida. Adicione múltiplas cópias, posicione-as exatamente onde você quer e crie designs incríveis de forma simples.',
  keywords: 'clonar imagem, duplicar imagem, ferramenta para clonar imagem, editar imagens online, queflow, clonar imagem'
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
