export const Features = () => {
  const features = [
    {
      title: "Clonar objetos na imagem",
      description: "Clonar objetos dentro da sua imagem e criar várias versões sem alterar o fundo.",
      icon: "🔄"
    },
    {
      title: "Adicionar logos ou imagens atrás da imagem principal",
      description: "Inserir logos, imagens de produtos ou outros gráficos atrás da imagem principal para melhorar a composição.",
      icon: "🎯"
    },
    {
      title: "Alterar fundos e mover objetos",
      description: "Alterar o fundo das suas imagens ou reposicionar objetos para obter o visual perfeito.",
      icon: "🎨"
    },
    {
      title: "Remover fundos",
      description: "Remover o fundo das suas imagens com precisão para um visual profissional e limpo.",
      icon: "✂️"
    },
    {
      title: "Adicionar texto atrás das imagens",
      description: "Adicionar texto atrás das imagens para criar profundidade e um visual único e profissional.",
      icon: "✍️"
    },
    {
      title: "Adicionar formas atrás das imagens",
      description: "Inserir formas atrás dos objetos para adicionar dimensão e criatividade.",
      icon: "🔷"
    }
  ];

  return (
    <section className="py-16 md:py-24"> {/* Removed bg-black/40 */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Tudo o que você precisa para <span className="text-purple-400">criar imagens incríveis</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all"
            >
              <div className="text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
