import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, DollarSign, UserX, HeartPulse, ArrowDown, Sparkles, UserCheck } from "lucide-react";

const alertStats = [
  {
    icon: AlertTriangle,
    value: "1º e 2º",
    title: "Ranking Mundial",
    description: "Brasil como líder em ansiedade e 2º em burnout no mundo.",
  },
  {
    icon: TrendingUp,
    value: "+2.200%",
    title: "Ações Trabalhistas",
    description: "Crescimento de processos por riscos psicossociais na última década.",
  },
  {
    icon: DollarSign,
    value: "R$ 3,1 bi",
    title: "Impacto Previdenciário",
    description: "Gastos do INSS com afastamentos mentais registrados em 2025.",
  },
  {
    icon: UserX,
    value: "60%",
    title: "Presenteísmo",
    description: "Perda estimada do salário anual por queda de produtividade individual.",
  },
];

const positiveStats = [
  {
    icon: HeartPulse,
    value: "1.000%",
    title: "ROI em Saúde Mental",
    description: "Cada R$ 1 investido gera até R$ 11 de retorno em produtividade.",
    featured: true,
  },
  {
    icon: ArrowDown,
    value: "-30%",
    title: "Absenteísmo",
    description: "Redução de custos com faltas e sobrecarga da equipe.",
  },
  {
    icon: Sparkles,
    value: "+21%",
    title: "Engajamento",
    description: "Aumento real na produtividade em ambientes saudáveis.",
  },
  {
    icon: UserCheck,
    value: "-28,6%",
    title: "Turnover",
    description: "Maior retenção de talentos e redução de custos de rescisão.",
  },
];

const cardAnim = (i: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: i * 0.1 },
});

const StatsSection = () => {
  return (
    <section className="py-20 space-y-20">
      {/* Seção 1 — Alerta */}
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Panorama da saúde mental <span className="text-caqui">relacionada ao trabalho</span> no Brasil
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {alertStats.map((stat, i) => (
            <motion.div
              key={i}
              {...cardAnim(i)}
              className="rounded-2xl border border-caqui/25 bg-card p-7 hover:shadow-lg transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-caqui/10 flex items-center justify-center mb-4">
                <stat.icon className="h-5 w-5 text-caqui" />
              </div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-caqui mb-1">{stat.value}</div>
              <div className="text-base font-semibold text-foreground mb-1">{stat.title}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seção 2 — Positiva */}
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Retorno para empresas que <span className="text-verde-selva">investem em saúde mental</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {positiveStats.map((stat, i) => (
            <motion.div
              key={i}
              {...cardAnim(i)}
              className={`rounded-2xl border p-7 hover:shadow-lg transition-shadow ${
                stat.featured
                  ? "border-verde-selva/40 bg-verde-selva/5 ring-1 ring-verde-selva/20"
                  : "border-verde-selva/25 bg-card"
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-verde-selva/10 flex items-center justify-center mb-4">
                <stat.icon className="h-5 w-5 text-verde-selva" />
              </div>
              <div className={`text-4xl md:text-5xl font-heading font-bold text-verde-selva mb-1 ${stat.featured ? "md:text-6xl" : ""}`}>
                {stat.value}
              </div>
              <div className="text-base font-semibold text-foreground mb-1">{stat.title}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Fontes */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-muted-foreground text-center mt-8"
        >
          Fontes: OMS, MPT, INSS e Relatório McKinsey Health Institute 2025.
        </motion.p>
      </div>
    </section>
  );
};

export default StatsSection;
