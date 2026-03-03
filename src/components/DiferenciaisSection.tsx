import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, BarChart3 } from "lucide-react";

const differentials = [
  {
    icon: ShieldCheck,
    title: "100% Adequada à Realidade Brasileira",
    description: "Metodologia exclusiva para o contexto cultural e legislativo nacional, superando modelos estrangeiros que ignoram as particularidades do trabalho no Brasil.",
  },
  {
    icon: Zap,
    title: "Metodologia Nativa Pós-Pandemia",
    description: "Enquanto as ferramentas tradicionais datam de 1980 a 2017, o IBRP utiliza uma inteligência concebida para os desafios reais do mundo do trabalho contemporâneo.",
  },
  {
    icon: Users,
    title: "Abrangência de Modelos de Contratação",
    description: "Diagnóstico com métricas específicas para colaboradores presenciais, híbridos e remotos, atendendo plenamente aos regimes CLT e PJ.",
  },
  {
    icon: BarChart3,
    title: "Flexibilidade e Métricas Estratégicas",
    description: "Customização avançada com indicadores exclusivos como Leadership NPS e Employee NPS para resultados sustentáveis.",
  },
];

const DiferenciaisSection = () => {
  return (
    <section id="diferenciais" className="py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Por que o <span className="text-gradient">IBRP?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Diferenciais que fazem da nossa metodologia a mais completa do mercado.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6"
            >
              <div className="flex items-center justify-center mx-auto mb-5">
                <diff.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-heading font-bold mb-2">{diff.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{diff.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiferenciaisSection;
