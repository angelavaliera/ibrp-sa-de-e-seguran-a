import { motion } from "framer-motion";
import brainSymbol from "@/assets/ibrp-brain-symbol.png";

const SobreSection = () => {
  return (
    <section id="sobre" className="py-24" style={{ backgroundColor: "hsl(36 30% 93%)" }}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-verde-selva mb-3 block">
            Quem somos
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight text-foreground">
            Sobre o <span className="text-gradient">IBRP</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[3fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <p className="text-lg leading-relaxed font-medium text-verde-selva">
              O Instituto Brasileiro de Riscos Psicossociais nasceu porque acreditamos que pessoas em equilíbrio tornam as suas vidas e as vidas dos outros melhores, e porque ambientes corporativos saudáveis constroem resultados sustentáveis.
            </p>

            <p className="text-lg leading-relaxed text-foreground">
              Transformamos a obrigatoriedade da NR-1 em vantagem competitiva para as empresas.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Atuamos na redução do absenteísmo, presenteísmo, turnover e ações trabalhistas, trazendo maior produtividade e lucratividade. Atuamos na gestão de riscos psicossociais em conformidade com a NR-1 com metodologia própria 100% adequada à realidade brasileira.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Realizamos inventários de riscos precisos em plataforma própria, que os funcionários podem acessar via QR Code de maneira simplificada e garantindo o anonimato conforme a norma. Utilizamos Inteligência Artificial para processar dados, gerar relatórios e elaborar planos de ação estratégicos específicos para cada caso. Os treinamentos e palestras ocorrem em ambiente virtual de aprendizagem (AVA), gerando toda a documentação necessária para a norma e reduzindo passivos trabalhistas.
            </p>
          </motion.div>

          {/* Symbol column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-10 blur-3xl scale-125" />
              <img
                src={brainSymbol}
                alt="Símbolo do IBRP — cérebro representando saúde mental e riscos psicossociais"
                className="relative w-56 md:w-72 lg:w-80 mx-auto drop-shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;
