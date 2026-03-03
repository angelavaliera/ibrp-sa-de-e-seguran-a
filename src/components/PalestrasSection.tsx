import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PalestrasSection = () => {
  const [form, setForm] = useState({ nome: "", empresa: "", email: "" });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Solicitação enviada!",
      description: "Entraremos em contato em breve.",
    });
    setForm({ nome: "", empresa: "", email: "" });
  };

  return (
    <section id="palestras" className="py-20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-fucsia/10 flex items-center justify-center">
                <Mic className="h-6 w-6 text-fucsia" />
              </div>
              <span className="text-sm font-medium text-fucsia uppercase tracking-widest">Palestras</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Leve conhecimento transformador para sua equipe
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Nosso cardápio de temas aborda desde a prevenção de burnout até a construção de ambientes psicologicamente seguros. Palestras conduzidas por especialistas com experiência prática e respaldo científico.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              {["Saúde mental no trabalho pós-pandemia", "Liderança empática e produtiva", "NR-1 na prática: o que muda para sua empresa", "Prevenção ao assédio moral e sexual"].map((topic, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-brand shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-border bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-xl font-heading font-bold mb-6">Solicite uma palestra</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Nome</label>
                  <Input
                    required
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    className="bg-muted border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Empresa</label>
                  <Input
                    required
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    placeholder="Nome da empresa"
                    className="bg-muted border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">E-mail</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="bg-muted border-border"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 transition-opacity">
                  Enviar Solicitação
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PalestrasSection;
