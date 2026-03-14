import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


const differentials = [
  {
    icon: ShieldCheck,
    title: "100% Adequada à Realidade Brasileira",
    description:
      "Metodologia exclusiva para o contexto cultural e legislativo nacional, superando modelos estrangeiros que ignoram as particularidades do trabalho no Brasil.",
    bgClass: "bg-verde-selva/10 border-verde-selva/20",
    hoverClass: "hover:bg-verde-selva/15",
    iconBg: "bg-verde-selva/15",
    iconText: "text-verde-selva",
    accentBorder: "border-l-verde-selva",
  },
  {
    icon: Zap,
    title: "Alinhada às novas dinâmicas de trabalho",
    description:
      "Enquanto as ferramentas tradicionais datam de 1980 a 2017, o IBRP utiliza uma inteligência concebida para os desafios reais do mundo do trabalho atual, desenvolvida em 2025.",
    bgClass: "bg-indigo-brand/10 border-indigo-brand/20",
    hoverClass: "hover:bg-indigo-brand/15",
    iconBg: "bg-indigo-brand/15",
    iconText: "text-indigo-brand",
    accentBorder: "border-l-indigo-brand",
  },
  {
    icon: Users,
    title: "Abrangência de Modelos de Contratação",
    description:
      "Análise de riscos específicos de remotos e híbridos, além de presenciais. Única metodologia que atende regimes CLT e PJ, com questionário exclusivo para profissionais terceirizados, como a lei prevê.",
    bgClass: "bg-fucsia/10 border-fucsia/20",
    hoverClass: "hover:bg-fucsia/15",
    iconBg: "bg-fucsia/15",
    iconText: "text-fucsia",
    accentBorder: "border-l-fucsia",
  },
  {
    icon: BarChart3,
    title: "Flexibilidade e Métricas Estratégicas",
    description:
      "Customização avançada com indicadores estratégicos como Leadership NPS e Employee NPS para resultados mais amplos e sustentáveis.",
    bgClass: "bg-caqui/10 border-caqui/20",
    hoverClass: "hover:bg-caqui/15",
    iconBg: "bg-caqui/15",
    iconText: "text-caqui",
    accentBorder: "border-l-caqui",
  },
];

const DiferenciaisSection = () => {
  return (
    <section id="diferenciais" className="pt-8 pb-24 bg-muted/30">
      <div className="container mx-auto">
        {/* Título centralizado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-verde-selva mb-3 block">
            Diferenciais
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight mb-4 text-foreground">
            Por que o <span className="text-gradient">IBRP?</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Conheça os diferenciais que fazem da nossa Metodologia de Gestão de Riscos Psicossociais a mais completa do mercado.
          </p>
        </motion.div>

        {/* Cards horizontais */}
        <div className="flex flex-col gap-5 max-w-4xl mx-auto">
          {differentials.map((diff, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border border-l-4 ${diff.accentBorder} ${diff.bgClass} ${diff.hoverClass} p-7 flex items-start gap-6 transition-all hover:shadow-lg`}
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className={`w-14 h-14 rounded-xl ${diff.iconBg} flex items-center justify-center shrink-0`}>
                <diff.icon className={`h-7 w-7 ${diff.iconText}`} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold mb-2 text-foreground">
                  {diff.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
          >
            Solicitar Diagnóstico
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default DiferenciaisSection;
