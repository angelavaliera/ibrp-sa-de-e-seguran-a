import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, BarChart3 } from "lucide-react";
import logoSelo from "@/assets/logo-ibrp-selo.png";

const differentials = [
  {
    icon: ShieldCheck,
    title: "100% Adequada à Realidade Brasileira",
    description:
      "Metodologia exclusiva para o contexto cultural e legislativo nacional, superando modelos estrangeiros que ignoram as particularidades do trabalho no Brasil.",
    color: "verde-selva",
    bgClass: "bg-verde-selva/10 border-verde-selva/20",
    hoverClass: "hover:bg-verde-selva/15",
    iconBg: "bg-verde-selva/15",
    iconText: "text-verde-selva",
    topBorder: "from-verde-selva to-verde-selva/60",
  },
  {
    icon: Zap,
    title: "Metodologia Nativa Pós-Pandemia",
    description:
      "Enquanto as ferramentas tradicionais datam de 1980 a 2017, o IBRP utiliza uma inteligência concebida para os desafios reais do mundo do trabalho atual, desenvolvida em 2025.",
    color: "indigo-brand",
    bgClass: "bg-indigo-brand/10 border-indigo-brand/20",
    hoverClass: "hover:bg-indigo-brand/15",
    iconBg: "bg-indigo-brand/15",
    iconText: "text-indigo-brand",
    topBorder: "from-indigo-brand to-indigo-brand/60",
  },
  {
    icon: Users,
    title: "Abrangência de Modelos de Contratação",
    description:
      "Análise de riscos específicos de remotos e híbridos, além de presenciais. Única metodologia que atende regimes CLT e PJ, com questionário exclusivo profissionais terceirizados, como a lei prevê.",
    color: "fucsia",
    bgClass: "bg-fucsia/10 border-fucsia/20",
    hoverClass: "hover:bg-fucsia/15",
    iconBg: "bg-fucsia/15",
    iconText: "text-fucsia",
    topBorder: "from-fucsia to-fucsia/60",
  },
  {
    icon: BarChart3,
    title: "Flexibilidade e Métricas Estratégicas",
    description:
      "Customização avançada com indicadores estratégicos como Leadership NPS e Employee NPS para resultados mais amplos e sustentáveis.",
    color: "caqui",
    bgClass: "bg-caqui/10 border-caqui/20",
    hoverClass: "hover:bg-caqui/15",
    iconBg: "bg-caqui/15",
    iconText: "text-caqui",
    topBorder: "from-caqui to-caqui/60",
  },
];

const DiferenciaisSection = () => {
  return (
    <section id="diferenciais" className="py-24">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Coluna esquerda — selo + título */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 lg:sticky lg:top-28 flex flex-col items-center lg:items-start"
          >
            <img
              src={logoSelo}
              alt="Selo IBRP"
              className="w-36 md:w-44 mb-8 drop-shadow-md"
            />
            <span className="text-sm font-semibold uppercase tracking-widest text-verde-selva mb-3 block">
              Diferenciais
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6 text-foreground text-center lg:text-left">
              Por que o{" "}
              <span className="text-verde-selva">IBRP?</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed text-center lg:text-left">
              Conheça os diferenciais que fazem da nossa metodologia a mais completa do mercado.
            </p>
          </motion.div>

          {/* Coluna direita — grid 2×2 de cards coloridos */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
            {differentials.map((diff, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`rounded-2xl border p-7 transition-colors overflow-hidden relative ${diff.bgClass} ${diff.hoverClass}`}
              >
                {/* Barra de cor no topo */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${diff.topBorder}`} />

                <div className={`w-10 h-10 rounded-xl ${diff.iconBg} flex items-center justify-center mb-4`}>
                  <diff.icon className={`h-5 w-5 ${diff.iconText}`} strokeWidth={1.5} />
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
