import { motion } from "framer-motion";
import { QrCode, ClipboardList, Activity } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: QrCode,
    title: "Inventário de Riscos",
    description: "Coleta de dados via QR Code com questionários validados cientificamente. Processo rápido, anônimo e acessível para todos os colaboradores.",
    color: "from-indigo-brand to-verde-selva",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Plano de Ação",
    description: "Desenvolvimento de treinamentos personalizados e revisão de processos organizacionais com base nos dados coletados.",
    color: "from-verde-selva to-caqui",
  },
  {
    step: "03",
    icon: Activity,
    title: "Monitoramento Contínuo",
    description: "Acompanhamento permanente dos indicadores de saúde mental e clima organizacional com relatórios periódicos.",
    color: "from-caqui to-fucsia",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-widest">Soluções NR-1</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
            Metodologia em <span className="text-gradient">3 etapas</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Um processo estruturado, validado e 100% adequado à legislação brasileira para proteger sua empresa e seus colaboradores.
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
              <div className="rounded-2xl border border-border bg-card p-8 h-full hover:border-primary/30 transition-colors"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className={`text-6xl font-heading font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-30 mb-4`}>
                  {step.step}
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
