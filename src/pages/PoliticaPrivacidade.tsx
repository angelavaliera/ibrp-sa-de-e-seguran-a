import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const PoliticaPrivacidade = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | IBRP";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-20 md:py-28">
        <h1 className="text-2xl md:text-3xl font-heading font-bold mb-8">
          Política de Privacidade
        </h1>

        <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground/70">
            Última atualização: 20 de março de 2026
          </p>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              1. Introdução
            </h2>
            <p>
              O Instituto Brasileiro de Riscos Psicossociais (IBRP) está
              comprometido com a proteção dos seus dados pessoais. Esta Política
              de Privacidade descreve como coletamos, utilizamos, armazenamos e
              protegemos as informações que você nos fornece, em conformidade com
              a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              2. Dados Coletados
            </h2>
            <p>Podemos coletar os seguintes dados pessoais através do nosso site:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone celular</li>
              <li>Nome da empresa e cargo</li>
              <li>Porte da empresa</li>
              <li>Perfil profissional</li>
              <li>Mensagens enviadas através de formulários de contato</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              3. Finalidade do Tratamento
            </h2>
            <p>Seus dados pessoais são tratados para as seguintes finalidades:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Responder a solicitações de contato e propostas comerciais</li>
              <li>Enviar conteúdos informativos, newsletters e comunicações sobre nossos serviços</li>
              <li>Gerenciar inscrições em cursos e eventos</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              4. Base Legal
            </h2>
            <p>
              O tratamento dos seus dados pessoais é realizado com base no seu
              consentimento (Art. 7º, I, da LGPD), fornecido no momento do
              preenchimento dos nossos formulários. Você pode revogar seu
              consentimento a qualquer momento entrando em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              5. Compartilhamento de Dados
            </h2>
            <p>
              Seus dados podem ser compartilhados com ferramentas de e-mail
              marketing (como MailerLite) e plataformas de armazenamento seguro
              de dados (como Supabase) exclusivamente para o envio de
              comunicações autorizadas por você e para a gestão segura das
              suas informações. Não vendemos, alugamos ou compartilhamos seus
              dados com terceiros para fins comerciais não relacionados aos
              nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              6. Armazenamento e Segurança
            </h2>
            <p>
              Seus dados são armazenados em servidores seguros com criptografia
              e controles de acesso rigorosos. Adotamos medidas técnicas e
              organizacionais adequadas para proteger seus dados contra acesso
              não autorizado, perda, destruição ou alteração.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              7. Seus Direitos
            </h2>
            <p>
              Conforme a LGPD, você tem direito a:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              8. Retenção de Dados
            </h2>
            <p>
              Seus dados pessoais serão armazenados pelo tempo necessário para
              cumprir as finalidades descritas nesta política ou conforme
              exigido por lei. Após esse período, os dados serão eliminados de
              forma segura.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              9. Contato
            </h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta
              Política de Privacidade, entre em contato conosco pelo e-mail:{" "}
              <a
                href="mailto:contato@ibrp.org.br"
                className="text-primary hover:underline"
              >
                contato@ibrp.org.br
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              10. Alterações nesta Política
            </h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente.
              Recomendamos que você a consulte regularmente. A data da última
              atualização estará sempre indicada no topo desta página.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidade;
