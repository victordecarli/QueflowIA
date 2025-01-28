import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Queflow IA - Editar Imagens com Clonagem, Texto Atrás e Fundos Personalizados',
  description: 'A ferramenta definitiva para adicionar texto e formas atrás de imagens, remover fundos, clonar objetos, mudar fundos e criar efeitos luminosos de forma fácil e rápida. Ideal para criadores e designers.',
  keywords: [
    'editor de imagem',
    'clonar imagem',
    'mudar fundo',
    'efeito luminoso',
    'queflow',
    'editor de imagem',
    'editor de imagem online',
    'editor de imagem gratuito',
    'editor de imagem online gratuito',
    'editor de imagem online grátis',
  ].join(', '),
  openGraph: {
    title: 'Queflow IA - Editar Imagens com Clonagem, Texto Atrás e Fundos Personalizados',
    description: 'A ferramenta definitiva para adicionar texto e formas atrás de imagens, remover fundos, clonar objetos, mudar fundos e criar efeitos luminosos de forma fácil e rápida. Ideal para criadores e designers.',
    url: 'https://underlayx.com/custom-editor',
    siteName: 'Queflow IA',
    images: [
      {
        url: 'https://underlayx.com/og-image.png', // Add your OG image path
        width: 1200,
        height: 630,
        alt: 'Queflow IA Editor'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queflow IA - Editar Imagens com Clonagem, Texto Atrás e Fundos Personalizados',
    description: 'A ferramenta definitiva para adicionar texto e formas atrás de imagens, remover fundos, clonar objetos, mudar fundos e criar efeitos luminosos de forma fácil e rápida. Ideal para criadores e designers.',
    images: ['https://underlayx.com/og-image.png'], // Add your Twitter card image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
