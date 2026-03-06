import { motion } from "framer-motion";
import { BookOpen, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "Gestão de Riscos Psicossociais",
    description: "Formação completa para profissionais de RH, SST e líderes organizacionais sobre identificação, avaliação e mitigação de riscos psicossociais.",
    
    hours: "40h",
    icon: Award,
    featured: true,
  },
  {
    title: "NR-1 para Gestores",
    description: "Entenda as obrigações legais e como implementar um programa de gerenciamento de riscos ocupacionais eficaz.",
    hours: "20h",
    icon: BookOpen,
    featured: false,
  },
  {
    title: "Primeiros Socorros Psicológicos",
    description: "Capacitação para acolhimento e suporte emocional no ambiente corporativo em situações de crise.",
    hours: "16h",
    icon: BookOpen,
    featured: false,
  },
];

const CursosSection = () => {
  return (
    <section id="cursos" className="py-20 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-sm font-medium text-brilho-sol uppercase tracking-widest">Cursos</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
            Capacitação <span className="text-gradient">profissional</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cursos desenvolvidos por nossos especialistas para quem quer se profissionalizar e atuar com Gestão de Riscos Psicossociais e NR-1 nas empresas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-2xl border p-8 h-full flex flex-col ${
                course.featured
                  ? "border-primary/40 bg-card ring-1 ring-primary/20"
                  : "border-border bg-card"
              }`}
              style={{ boxShadow: course.featured ? "var(--shadow-glow)" : "var(--shadow-card)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <course.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{course.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{course.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {course.hours}
                </div>
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                  Saiba mais
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CursosSection;
