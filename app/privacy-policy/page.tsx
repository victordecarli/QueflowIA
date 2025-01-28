import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
          Política de Privacidade
        </h1>
        <p className="text-gray-400 text-center mb-12">Data de entrada: 21 de janeiro de 2024</p>
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
            <p className="text-gray-300 mb-6">
              Queflow IA ("the Service") respeita sua privacidade e se compromete a proteger suas informações pessoais. Esta Política de Privacidade explica como coletamos, usamos e protegemos seus dados quando você usa nosso Serviço.
            </p>

            {[
              {
                title: "1. Informações que coletamos",
                content: [
                  "Coletamos apenas as seguintes informações quando você usa nosso Serviço:",
                  "1.1 Google Account Information:",
                  "Quando você se conecta usando Google Sign-In, coletamos seu endereço de e-mail e avatar (imagem de perfil) para criar sua conta e exibir esta informação na interface do usuário.",
                  "1.2 Payment Information:",
                  "• Para transações que requerem métodos de pagamento indiano (via PayU), coletamos seu número de telefone.",
                  "• Este número é necessário pelo PayU para enviar mensagens de SMS de confirmação de transação.",
                  "Nota: Não armazenamos seu número de telefone em nosso banco de dados. Ele é usado apenas para facilitar o processo de transação."
                ]
              },
              {
                title: "2. Processamento de Imagens",
                content: [
                  "2.1 Processamento Local:",
                  "Para recursos que não requerem serviços de terceiros, todo o processamento de imagens ocorre localmente no navegador do seu dispositivo. Suas imagens não são enviadas para ou armazenadas em nosso servidor.",
                  "2.2 Integração com Replicate API:",
                  "Quando você usa recursos que são alimentados pela API do Replicate, sua imagem é enviada temporariamente para seus servidores para processamento.",
                  "Política do Replicate: Arquivos de entrada e saída são automaticamente excluídos após uma hora em seus servidores.",
                  "Não armazenamos ou usamos suas imagens de entrada ou saída para qualquer outro propósito além de fornecer o resultado processado.",
                  "Nota: Se você deseja manter a imagem processada, deve baixá-la, pois nem o Replicate nem o UnderlayX armazenam estas imagens permanentemente."
                ]
              },
              {
                title: "3. Como usamos suas informações",
                content: [
                  "Usamos as informações coletadas para os seguintes propósitos:",
                  "• Criação e Exibição de Conta: Para criar sua conta e exibir seu endereço de e-mail e avatar na interface.",
                  "• Autenticação: Para verificar sua identidade e habilitar o acesso a determinados recursos do Serviço.",
                  "• Facilitação de Transações: Para garantir o processamento de pagamento com sucesso para usuários indiano via PayU.",
                  "• Melhoria do Serviço: Para entender padrões de uso e melhorar o Serviço (via dados anonimizados do Google Analytics)."
                ]
              },
              {
                title: "4. Privacidade e Segurança de Dados",
                content: [
                  "• Não Armazenamento de Imagens: Suas imagens não são armazenadas em nosso servidor. Imagens enviadas para a API do Replicate são automaticamente excluídas após o processamento ou dentro de uma hora, conforme sua política.",
                  "• Não Compartilhamento de Dados: Não compartilhamos, vendemos ou distribuímos suas informações pessoais com terceiros.",
                  "• Google Analytics: Usamos Google Analytics para rastrear estatísticas anônimas de uso, como visualizações de página e tempos de sessão. Este dado não está vinculado às suas informações pessoais."
                ]
              },
              {
                title: "5. Serviços de Terceiros",
                content: [
                  "Usamos os seguintes serviços de terceiros:",
                  "• Google Sign-In: Para autenticar usuários e recuperar endereços de e-mail e avatares.",
                  "• Google Analytics: Para coletar dados anônimos de uso para melhorar o Serviço.",
                  "• PayU: Para processar pagamentos para usuários indiano, que requer um número de telefone para notificações de SMS de transação.",
                  "• Replicate API: Para processar imagens enviadas pelos usuários. Arquivos de entrada e saída são excluídos após uma hora conforme a política do Replicate.",
                  "Esses serviços podem ter suas próprias políticas de privacidade, que você pode revisar para entender como eles lidam com seus dados."
                ]
              },
              {
                title: "6. Seus Direitos",
                content: [
                  "Como usuário, você tem os seguintes direitos:",
                  "Exclusão de Dados: Como nenhuma imagem ou dados pessoais são armazenados permanentemente em nosso servidor, seus dados são automaticamente removidos após o processamento ou ao sair do Serviço."
                ]
              },
              {
                title: "7. Alterações nesta Política de Privacidade",
                content: "Podemos atualizar esta Política de Privacidade ocasionalmente. Qualquer alteração será postada nesta página, e a nova política entrará em vigor após a postagem."
              },
              {
                title: "8. Contato",
                content: [
                  "Se você tiver alguma dúvida ou preocupação sobre esta Política de Privacidade, por favor entre em contato conosco:",
                  "Email: odevvictor@gmail.com",
                  "Website: https://www.underlayx.com"
                ]
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
