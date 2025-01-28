import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
          Termos e Condições
        </h1>
        <p className="text-gray-400 text-center mb-12">Data de entrada em vigor: 21 de janeiro de 2024</p>
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
            <p className="text-gray-300 mb-6">
              Ao acessar ou usar Queflow IA ("o Serviço"), você concorda em cumprir e estar vinculado a estes Termos e Condições ("Termos"). Se você não concordar com estes Termos, não use o Serviço.
            </p>

            {[
              {
                title: "1. Aceitação de Termos",
                content: "Ao usar Queflow IA, você concorda com estes Termos e Condições, que podem ser atualizados ocasionalmente. Encorajamos você a revisar estes Termos periodicamente para se manter informado sobre quaisquer mudanças."
              },
              {
                title: "2. Autenticação do Usuário",
                content: ["Google Sign-In: Para acessar certas funcionalidades do Serviço, você deve autenticar via Google Sign-In. Usamos o método de redirecionamento do Google Sign-In para autenticar você e recuperar seu endereço de e-mail e avatar do Google. Esta informação será usada para criar sua conta e exibir seu avatar e e-mail na interface do usuário (UI).",
                  "Você é responsável por manter a confidencialidade de suas credenciais de login."]
              },
              {
                title: "3. Processamento de Imagens",
                content: ["Todos os processamentos de imagens, incluindo a adição de texto e formas por trás das imagens, ocorrem inteiramente no navegador do seu dispositivo. Queflow IA não processa ou armazena nenhuma de suas imagens em nosso servidor.",
                  "O Serviço apenas processa imagens localmente, o que significa que seus dados nunca saem do seu dispositivo a menos que você escolha baixar o arquivo processado."]
              },
              {
                title: "4. Privacidade e Segurança de Dados",
                content: ["Queflow IA não armazena nenhuma imagem ou dados pessoais em seus servidores. Todas as imagens e dados são processados no navegador do seu dispositivo.",
                  "Não rastreamos ou armazenamos dados pessoais. Qualquer dado (como imagens) fornecido por você é processado localmente e excluído assim que você sair da página ou baixar a imagem processada.",
                  "Integrações de Terceiros:",
                  "• Usamos PayU para pagamentos dentro da Índia, exigindo um número de telefone para enviar mensagens de transação. Esta informação é passada para PayU de forma segura, mas não é armazenada em nosso banco de dados.",
                  "• Usamos a API do Replicate para processar imagens. Imagens são enviadas para sua API para processamento, e os resultados são retornados sem ser armazenados por nós. O Replicate exclui qualquer arquivo de entrada ou saída após uma hora."]
              },
              {
                title: "5. Responsabilidades do Usuário",
                content: ["Encorajamos você a explorar sua criatividade e se divertir usando Queflow IA! Para manter a plataforma divertida e segura para todos, pedimos que você:",
                  "• Use o Serviço de forma responsável e inspiradora.",
                  "• Evite enviar ou criar conteúdo que possa prejudicar outros ou violar quaisquer leis, como material ofensivo, explícito ou ilegal.",
                  "• Respeitar os direitos autorais e garantir que o conteúdo que você criar não infrinja os direitos de outros.",
                  "• Mantenha o Serviço funcionando suavemente usando-o como pretendido e evitando atividades não autorizadas."]
              },
              {
                title: "6. Limitações de Responsabilidade",
                content: ["Queflow IA fornece o Serviço \"como está\" e não garante que o Serviço será contínuo ou sem erros.",
                  "Não somos responsáveis por quaisquer danos diretos, indiretos, incidentais ou consequentes decorrentes do uso do Serviço, incluindo, mas não se limitando a qualquer perda de dados ou imagens."]
              },
              {
                title: "7. Terminação",
                content: "Queflow IA reserva o direito de suspender ou terminar seu acesso ao Serviço se determinarmos que você violou estes Termos."
              },
              {
                title: "8. Alterações aos Termos",
                content: "Reservamos o direito de modificar ou atualizar estes Termos a qualquer momento. Quando fazemos alterações, publicaremos os Termos atualizados nesta página, e as alterações se tornarão eficazes imediatamente após a publicação."
              },
              {
                title: "9. Informações de Contato",
                content: ["Se você tiver alguma dúvida sobre estes Termos e Condições, por favor entre em contato conosco:",
                  "Email: odevvictor@gmail.com",
                  "Website: https://www.underlayx.com/"]
              }
            ].map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <div className="space-y-2">
                    {section.content.map((item, i) => (
                      <p key={i} className="text-gray-300">{item}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
