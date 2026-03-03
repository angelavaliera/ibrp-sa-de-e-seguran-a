import { motion } from "framer-motion";
import { Shield, Leaf, Users, Globe } from "lucide-react";

const differentials = [
  {
    icon: Shield,
    title: "Metodologia Própria",
    description: "Desenvolvida exclusivamente para o contexto corporativo brasileiro, com base em evidências científicas.",
  },
  {
    icon: Leaf,
    title: "Pós-Pandemia",
    description: "Atualizada para os novos desafios de saúde mental que surgiram após a pandemia de COVID-19.",
  },
  {
    icon: Users,
    title: "Todos os Modelos de Trabalho",
    description: "Contempla trabalhadores presenciais, híbridos e remotos com abordagens específicas para cada realidade.",
  },
  {
    icon: Globe,
    title: "Resultados Sustentáveis",
    description: "Foco em transformação de longo prazo, não soluções paliativas. Métricas claras de progresso.",
  },
];

const DiferenciaisSection = () => {
  return (
    <section className="py-20">
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
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <diff.icon className="h-7 w-7 text-primary" />
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
