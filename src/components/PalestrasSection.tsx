import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import palestrasBg from "@/assets/palestras-bg.jpg";

const PalestrasSection = () => {
  const scrollToContato = () => {
    const el = document.querySelector("#contato");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="palestras"
      className="py-20 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${palestrasBg})` }}
    >
      {/* Sand-tone overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "hsla(36, 33%, 93%, 0.88)" }} />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-sm font-medium text-fucsia uppercase tracking-widest mb-6 block">Palestras e Treinamentos</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
            Leve conhecimento transformador para sua equipe
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Cardápio completo com temas orientados a cada tipo de risco. Palestras e treinamentos conduzidos por especialistas com experiência prática e respaldo científico. Abordagem empática e acessível voltada para o desenvolvimento humano.
          </p>
          <ul className="space-y-3 text-muted-foreground text-left max-w-md mx-auto mb-8">
            {["Saúde mental no trabalho pós-pandemia", "Liderança empática e produtiva", "NR-1 na prática: o que muda para sua empresa", "Prevenção ao assédio moral e sexual"].map((topic, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-brand shrink-0" />
                {topic}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            onClick={scrollToContato}
            className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
          >
            Solicitar Cardápio de Temas
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PalestrasSection;
