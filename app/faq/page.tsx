import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function FAQ() {
  const faqs = [
    {
      question: "O que é Queflow IA?",
      answer: "Queflow IA é uma ferramenta online gratuita projetada para edição de imagens criativas. Permite clonar imagens, adicionar texto e formas por trás de objetos, personalizar fundos e baixar edições de alta qualidade, tudo diretamente do seu navegador."
    },
    {
      question: "Preciso criar uma conta para usar Queflow IA?",
      answer: "Sim, você precisa se cadastrar com o Google para acessar Queflow IA e desbloquear seu conjunto completo de recursos."
    },
    {
      question: "Queflow IA armazena minhas imagens ou dados pessoais?",
      answer: "Não, Queflow IA opera totalmente no lado do cliente. Suas imagens e edições são processadas localmente em seu dispositivo e nunca são enviadas ou armazenadas em nossos servidores."
    },
    {
      question: "Queflow IA é gratuito?",
      answer: "Sim, Queflow IA é gratuito. O plano premium será introduzido em breve para mais funcionalidades."
    },
    {
      question: "Queflow IA oferece quais recursos?",
      answer: "Queflow IA oferece ferramentas de edição poderosas, incluindo clonar imagens, personalizar fundos, adicionar texto por trás de imagens, colocar formas por trás de objetos e baixar edições de alta qualidade."
    },
    {
      question: "Como adicionar texto por trás de uma imagem?",
      answer: <span>Você pode adicionar texto por trás de imagens facilmente. Basta visitar <Link href="https://www.underlayx.com/text-behind-image" className="text-blue-400 hover:underline">Texto por trás da imagem</Link>.</span>
    },
    {
      question: "Como colocar formas por trás de objetos em uma imagem?",
      answer: <span>Para colocar formas por trás de objetos em sua imagem, visite <Link href="https://www.underlayx.com/shape-behind-image" className="text-blue-400 hover:underline">Forma por trás da imagem</Link>.</span>
    },
    {
      question: "Como remover o fundo de uma imagem?",
      answer: <span>Remover o fundo de qualquer imagem é simples. Visite <Link href="https://www.underlayx.com/remove-background" className="text-blue-400 hover:underline">Remover fundo</Link>.</span>
    },
    {
      question: "Como alterar o fundo de uma imagem?",
      answer: <span>Alterar o fundo de uma imagem é rápido e fácil. Visite <Link href="https://www.underlayx.com/change-background" className="text-blue-400 hover:underline">Alterar fundo</Link>.</span>
    },
    {
      question: "Como clonar uma imagem usando Queflow IA?",
      answer: <span>Clonar imagens é fácil. Basta visitar <Link href="https://www.underlayx.com/clone-image" className="text-blue-400 hover:underline">Clonar imagem</Link>.</span>
    },
    {
      question: "Posso personalizar fundos com Queflow IA?",
      answer: "Sim, você pode facilmente remover, alterar ou personalizar fundos para atender às suas necessidades criativas."
    },
    {
      question: "Queflow IA suporta downloads de alta resolução?",
      answer: "Sim! Todas as suas imagens editadas podem ser baixadas em alta resolução para garantir a melhor qualidade."
    },
    {
      question: "Preciso ter experiência em design para usar Queflow IA?",
      answer: "Não! Queflow IA é projetado para todos, desde iniciantes até profissionais."
    },
    {
      question: "Há um limite para quantas imagens posso editar no Queflow IA?",
      answer: "Não, você pode editar quantas imagens quiser sem nenhuma restrição."
    },
    {
      question: "Queflow IA funciona em todos os dispositivos?",
      answer: "Sim, Queflow IA é uma ferramenta baseada em web projetada para funcionar em qualquer dispositivo com uma conexão com a internet e um navegador moderno."
    },
    {
      question: "Como reportar um bug ou solicitar uma funcionalidade?",
      answer: "Você pode me contatar em odevvictor@gmail.com."
    },
    {
      question: "Queflow IA funciona offline?",
      answer: "Não, Queflow IA requer uma conexão com a internet para funcionar, pois é uma ferramenta baseada em web."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
          Perguntas frequentes
        </h1>
        <div className="max-w-3xl mx-auto space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-3">{faq.question}</h2>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
