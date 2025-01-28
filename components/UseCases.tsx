export const UseCases = () => {
  const cases = [
    {
      title: "Criadores de conteúdo",
      subtitle: "Criar visuais incríveis",
      description: "Adicione formas, texto e efeitos de luz atrás dos objetos em suas imagens para criar capturadores de tela do YouTube, posts do Instagram e mais. Clone objetos, adicione logos ou altere fundos com facilidade para suas histórias visuais.",
      icon: "🎥"
    },
    {
      title: "Marketing",
      subtitle: "Aumentar suas campanhas",
      description: "Designe visuais de alta qualidade com fontes personalizadas, cores e estilos para destacar suas imagens, banners e materiais promocionais. Adicione logos ou outras imagens atrás de seus produtos, clone objetos e remova fundos para alcançar o visual perfeito para suas campanhas.",
      icon: "📈"
    },
    {
      title: "Fotógrafos",
      subtitle: "Melhorar suas fotos",
      description: "Transforme imagens comuns em obras de arte extraordinárias ao colocar texto, formas e outros elementos atrás de objetos. Ajuste seus fundos ou mova objetos para criar a composição ideal.",
      icon: "📸"
    },
    {
      title: "Artistas digitais",
      subtitle: "Desperte sua criatividade",
      description: "Experimente cores, fontes e efeitos para dar vida à sua visão artística com ferramentas de IA. Coloque texto, logos ou imagens atrás de sua arte e use recursos de clonagem e alteração de fundos para criar criações únicas.",
      icon: "🎨"
    },
    {
      title: "Criadores de conteúdo",
      subtitle: "Destacar em cada plataforma",
      description: "Designe conteúdo envolvente para Instagram, TikTok, Facebook e muito mais em segundos. Use IA para colocar texto e objetos atrás de suas imagens para um visual profissional e estratificado.",
      icon: "📱"
    },
    {
      title: "Estudantes",
      subtitle: "Simplificar projetos criativos",
      description: "Posters, apresentações e materiais visuais para projetos escolares. Use a funcionalidade \"camada atrás da imagem\" para adicionar formas, logos ou texto aos seus projetos com facilidade.",
      icon: "📚"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Tudo para <span className="text-purple-400">Criadores</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cases.map((card, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="text-2xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {card.title}
              </h3>
              <h4 className="text-lg text-purple-400 font-medium mb-3">
                {card.subtitle}
              </h4>
              <p className="text-gray-400">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
