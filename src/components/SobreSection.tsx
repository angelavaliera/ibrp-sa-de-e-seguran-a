import { motion } from "framer-motion";
import brainSymbol from "@/assets/ibrp-brain-symbol.png";

const SobreSection = () => {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-verde-selva mb-3 block">
            Quem somos
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight text-foreground mb-6">
            Sobre o <span className="text-gradient">IBRP</span>
          </h2>

          {/* Brain symbol */}
          <div className="relative inline-block mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-10 blur-3xl scale-125" />
            <img
              src={brainSymbol}
              alt="Símbolo do IBRP — cérebro representando saúde mental e riscos psicossociais"
              className="relative w-40 md:w-52 mx-auto drop-shadow-xl"
            />
          </div>

          <div className="space-y-5 text-left">
            <p className="text-lg leading-relaxed text-foreground font-medium">
              O Instituto Brasileiro de Riscos Psicossociais — IBRP — nasceu porque acreditamos que{" "}
              <span className="text-verde-selva font-semibold">pessoas em equilíbrio</span> tornam as suas vidas e as vidas dos outros melhores, e porque{" "}
              <span className="text-verde-selva font-semibold">ambientes corporativos saudáveis</span> constroem resultados sustentáveis.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Transformamos a obrigatoriedade da NR-1 em vantagem competitiva para as empresas.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Atuamos na redução do absenteísmo, presenteísmo, turnover e ações trabalhistas, trazendo maior produtividade e lucratividade. Atuamos na gestão de riscos psicossociais em conformidade com a NR-1 com metodologia própria 100% adequada à realidade brasileira.
            </p>

            <p className="text-base leading-relaxed text-muted-foreground">
              Realizamos inventários de riscos precisos em plataforma própria, que os funcionários podem acessar via QR Code de maneira simplificada e garantindo o anonimato conforme a norma. Utilizamos Inteligência Artificial para processar dados, gerar relatórios e elaborar planos de ação estratégicos específicos para cada caso. Os treinamentos e palestras ocorrem em ambiente virtual de aprendizagem (AVA), gerando toda a documentação necessária para a norma e reduzindo passivos trabalhistas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SobreSection;
