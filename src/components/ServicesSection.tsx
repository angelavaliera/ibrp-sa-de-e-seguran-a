import { motion } from "framer-motion";
import stepQrcode from "@/assets/step-qrcode.jpg";
import stepTraining from "@/assets/step-training.jpg";
import stepMonitoring from "@/assets/step-monitoring.jpg";

const steps = [
  {
    step: "01",
    image: stepQrcode,
    imageAlt: "Colaborador usando celular para responder pesquisa via QR Code",
    title: "Inventário de Riscos Psicossociais",
    description: "Coleta de dados via QR Code com questionários validados cientificamente. Processo rápido, anônimo e acessível para todos os colaboradores.",
  },
  {
    step: "02",
    image: stepTraining,
    imageAlt: "Líderes em sessão de treinamento e desenvolvimento",
    title: "Plano de Ação e Intervenção Direta",
    description: "Desenvolvemos estratégias sob as diretrizes da NR-1. O IBRP realiza treinamentos e palestras (online ou presenciais) com total rigor documental: registros de presença, avaliações e certificação. Atuamos também na orientação para revisão de processos internos e elaboração de códigos de conduta e políticas.",
  },
  {
    step: "03",
    image: stepMonitoring,
    imageAlt: "Profissional analisando dashboard de indicadores de saúde mental",
    title: "Monitoramento Contínuo",
    description: "Acompanhamento permanente dos indicadores de saúde mental e clima organizacional com relatórios periódicos.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Soluções NR-1</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
            Gestão inteligente e <span className="text-gradient">humanizada</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Processo estruturado, em total conformidade com as normas e legislação brasileira para proteger profissionais e empresas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="rounded-2xl border border-border bg-card overflow-hidden h-full hover:border-primary/30 transition-all hover:shadow-lg"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-lg font-heading font-bold text-primary">{step.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
