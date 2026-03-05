import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, BarChart3 } from "lucide-react";

const differentials = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "100% Adequada à Realidade Brasileira",
    description:
      "Metodologia exclusiva para o contexto cultural e legislativo nacional, superando modelos estrangeiros que ignoram as particularidades do trabalho no Brasil.",
  },
  {
    icon: Zap,
    number: "02",
    title: "Metodologia Nativa Pós-Pandemia",
    description:
      "Enquanto as ferramentas tradicionais datam de 1980 a 2017, o IBRP utiliza uma inteligência concebida para os desafios reais do mundo do trabalho atual, desenvolvida em 2025.",
  },
  {
    icon: Users,
    number: "03",
    title: "Abrangência de Modelos de Contratação",
    description:
      "Análise de riscos específicos de remotos e híbridos, além de presenciais. Única metodologia que atende regimes CLT e PJ, com questionário exclusivo profissionais terceirizados, como a lei prevê.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Flexibilidade e Métricas Estratégicas",
    description:
      "Customização avançada com indicadores estratégicos como Leadership NPS e Employee NPS para resultados mais amplos e sustentáveis.",
  },
];

const DiferenciaisSection = () => {
  return (
    <section id="diferenciais" className="py-24">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Coluna esquerda — título editorial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-28"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-verde-selva mb-3 block">
              Diferenciais
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6 text-foreground">
              Por que o{" "}
              <span className="text-verde-selva">IBRP?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Conheça os diferenciais que fazem da nossa metodologia a mais completa do mercado.
            </p>
          </motion.div>

          {/* Coluna direita — grid 2×2 de cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {differentials.map((diff, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="rounded-2xl border border-verde-petroleo/10 bg-verde-petroleo/5 p-7 hover:bg-verde-petroleo/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-heading font-bold text-verde-selva/40">
                    {diff.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-verde-selva/15 flex items-center justify-center">
                    <diff.icon className="h-5 w-5 text-verde-selva" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 text-foreground">
                  {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {diff.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiferenciaisSection;
