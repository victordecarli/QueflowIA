import './globals.css';
import { inter } from './fonts';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/ThemeProvider";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { PricingProvider } from '@/contexts/PricingContext';


export const metadata = {
  title: 'Queflow IA - Transforme Suas Imagens com Clonagem, Texto Atrás e Fundos Personalizados',
  description: 'A ferramenta definitiva para adicionar texto e formas atrás de imagens, remover fundos, clonar objetos, mudar fundos e criar efeitos luminosos de forma fácil e rápida. Ideal para criadores e designers.',
  metadataBase: new URL('https://www.underlayx.com'),
  openGraph: {
    type: 'website',
    url: 'https://www.underlayx.com',
    title: 'Queflow IA - Transforme Suas Imagens com Clonagem, Texto Atrás e Fundos Personalizados',
    description: 'A ferramenta definitiva para adicionar texto e formas atrás de imagens, remover fundos, clonar objetos, mudar fundos e criar efeitos luminosos de forma fácil e rápida. Ideal para criadores e designers.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Queflow IA - Transforme Suas Imagens com Clonagem, Texto Atrás e Fundos Personalizados',
    description: 'A ferramenta definitiva para adicionar texto e formas atrás de imagens, remover fundos, clonar objetos, mudar fundos e criar efeitos luminosos de forma fácil e rápida. Ideal para criadores e designers.',
    creator: '@underlayx',
    images: ['/og-image.png'],
    site: '@underlayx',
  },
  keywords: 'mudar fundo, editor de fundo de imagem, substituir fundo de imagem, ferramenta para mudar fundo, editar imagens online, queflow, remove fundo',
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </head>
      <body className={`${inter.className} bg-[#191819] min-h-screen`}>
        <PricingProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </PricingProvider>
        <GoogleAnalytics gaId="G-LWYW0Q03ZL" />
      </body>
    </html>
  );
}
