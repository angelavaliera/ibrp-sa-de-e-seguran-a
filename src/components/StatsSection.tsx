import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, HeartPulse } from "lucide-react";

const stats = [
  {
    icon: AlertTriangle,
    value: "1º",
    label: "no ranking mundial de ansiedade",
    description: "O Brasil lidera o ranking global de transtornos de ansiedade segundo a OMS.",
    color: "text-caqui",
    borderColor: "border-caqui/30",
    bgColor: "bg-caqui/10",
  },
  {
    icon: TrendingUp,
    value: "+2.200%",
    label: "em ações por burnout",
    description: "Crescimento exponencial de processos trabalhistas relacionados ao esgotamento profissional.",
    color: "text-fucsia",
    borderColor: "border-fucsia/30",
    bgColor: "bg-fucsia/10",
  },
  {
    icon: HeartPulse,
    value: "1.000%",
    label: "de ROI em saúde mental",
    description: "Cada R$1 investido em saúde mental gera até R$10 de retorno em produtividade.",
    color: "text-verde-selva",
    borderColor: "border-verde-selva/30",
    bgColor: "bg-verde-selva/10",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            O cenário é <span className="text-gradient">alarmante</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dados que mostram a urgência de agir agora na gestão de riscos psicossociais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl border ${stat.borderColor} p-8 bg-card hover:shadow-lg transition-shadow`}
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-5`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-4xl md:text-5xl font-heading font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
