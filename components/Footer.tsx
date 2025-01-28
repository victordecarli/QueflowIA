import { Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full py-8 bg-black/30 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Queflow IA</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
              <li><Link href="/custom-editor" className="text-gray-400 hover:text-white transition-colors">Editor</Link></li>
            </ul>
          </div>

          {/* Blog Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Blog</h3>
            <ul className="space-y-2">
              <li><Link href="/blog/text-behind-images" className="text-gray-400 hover:text-white transition-colors">Texto atrás da imagem</Link></li>
              <li><Link href="/blog/glowing-text-effects" className="text-gray-400 hover:text-white transition-colors">Efeitos de texto brilhante</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Ver todos</Link></li>
            </ul>
          </div>

          {/* FAQ & Legal Links - Updated to include FAQ */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Política de privacidade</Link></li>
              <li><Link href="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors">Termos e condições</Link></li>
            </ul>
          </div>

          {/* Simplified Contact section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">
                Tem uma pergunta ou precisa de ajuda? Me envie um email em
              </li>
              <li className="text-gray-300 text-sm font-medium">
                odevictor@gmail.com
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-gray-400 text-sm">
              Editado por{' '}
              <a
                href="https://x.com/Vineer5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:underline"
              >
                Victor
              </a>
            </p>
          </div>
        </div>

        {/* Mobile view - Add Github link below 'Created by' */}
        <div className="md:hidden flex flex-col items-center gap-2 text-sm text-gray-400">
          <a
            href="https://github.com/victordecarli/Queflow-IA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Ver no GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
