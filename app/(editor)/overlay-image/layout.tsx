import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queflow IA - Sobrepor Imagens',
  description: 'Sobreponha imagens com IA. Crie composições visuais impressionantes ao combinar várias imagens juntas.',
  openGraph: {
    title: 'Queflow IA - Sobrepor Imagens',
    description: 'Sobreponha imagens com IA. Crie composições visuais impressionantes ao combinar várias imagens juntas.',
  },
};

export default function OverlayImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
