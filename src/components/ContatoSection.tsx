import { motion } from "framer-motion";
import { useState } from "react";
import { trackEvent } from "@/lib/gtag";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Loader2, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { syncToMailerLite } from "@/lib/sync-mailerlite";
import { formatPhone, isValidPhone, phoneDigits } from "@/lib/phone-utils";

const companySize = ["1-50", "51-200", "201-500", "+500"];
const interests = [
  "Serviços de Gestão de Riscos Psicossociais",
  "Palestras e Treinamentos Corporativos",
  "Cursos de Capacitação",
  "Coaching de Liderança",
];

// Zod validation schema
const contatoSchema = z.object({
  nome: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  telefone: z.string().refine((v) => isValidPhone(v), "Celular inválido. Use o formato (XX) XXXXX-XXXX"),
  empresa: z.string().trim().min(1, "Empresa é obrigatória").max(200, "Nome da empresa muito longo"),
  cargo: z.string().trim().min(1, "Cargo é obrigatório").max(100, "Cargo muito longo"),
  tamanho: z.string().min(1, "Tamanho da empresa é obrigatório"),
  interesse: z.string().min(1, "Interesse é obrigatório"),
  mensagem: z.string().max(1000, "Mensagem muito longa").optional(),
});

const ContatoSection = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    cargo: "",
    tamanho: "",
    interesse: "",
    mensagem: "",
  });
  const [lgpd, setLgpd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate with Zod
    const result = contatoSchema.safeParse(form);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Dados inválidos",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }
    
    if (!lgpd) {
      toast({
        title: "Consentimento necessário",
        description: "Marque a caixa de consentimento LGPD para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    const tel = phoneDigits(result.data.telefone);
    setLoading(true);
    const { error } = await supabase.from("contato_empresas_leads").insert({
      nome: result.data.nome,
      email: result.data.email,
      telefone: tel,
      empresa: result.data.empresa,
      cargo: result.data.cargo,
      tamanho: result.data.tamanho,
      interesse: result.data.interesse,
      mensagem: result.data.mensagem?.trim() || null,
    });
    setLoading(false);
    
    if (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      return;
    }
    
    syncToMailerLite({
      email: result.data.email,
      nome: result.data.nome,
      source: "contato",
      group_id: "182467519351620811",
      fields: {
        phone: phoneDigits(result.data.telefone),
        empresa: result.data.empresa,
        cargo: result.data.cargo,
        tamanho: result.data.tamanho,
        interesse: result.data.interesse,
      },
    });

    toast({
      title: "Solicitação enviada!",
      description: "Nossa equipe entrará em contato em breve.",
    });
    setForm({ nome: "", email: "", telefone: "", empresa: "", cargo: "", tamanho: "", interesse: "", mensagem: "" });
    setLgpd(false);
    setShowOptional(false);
  };

   return (
    <section id="contato" className="py-12 bg-verde-petroleo text-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-5 text-center text-white">
            Sua empresa está em conformidade?
          </h2>

          <div className="rounded-2xl border border-border p-6 bg-muted">
            <h3 className="text-lg font-heading font-bold mb-4 text-foreground">Solicite uma proposta</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Campos essenciais — sempre visíveis */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Nome *</label>
                  <Input
                    required
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Seu nome completo"
                    maxLength={100}
                    className="bg-background border-border h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">E-mail Corporativo *</label>
                  <Input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="seu@empresa.com"
                    maxLength={255}
                    className="bg-background border-border h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Celular com DDD *</label>
                  <Input
                    required
                    type="tel"
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: formatPhone(e.target.value) })}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="bg-background border-border h-9 text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Empresa *</label>
                  <Input
                    required
                    value={form.empresa}
                    onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                    placeholder="Nome da empresa"
                    maxLength={200}
                    className="bg-background border-border h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Interesse Principal *</label>
                  <Select value={form.interesse} onValueChange={(v) => setForm({ ...form, interesse: v })}>
                    <SelectTrigger className="bg-background border-border h-9 text-sm">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {interests.map((i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Campos opcionais — colapsáveis */}
              {!showOptional ? (
                <button
                  type="button"
                  onClick={() => setShowOptional(true)}
                  className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                  Adicionar mais detalhes (cargo, tamanho, mensagem)
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3 overflow-hidden"
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Cargo *</label>
                      <Input
                        required
                        value={form.cargo}
                        onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                        placeholder="Seu cargo"
                        maxLength={100}
                        className="bg-background border-border h-9 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Tamanho da Empresa *</label>
                      <Select value={form.tamanho} onValueChange={(v) => setForm({ ...form, tamanho: v })}>
                        <SelectTrigger className="bg-background border-border h-9 text-sm">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySize.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s} colaboradores
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Mensagem (opcional)</label>
                    <Textarea
                      value={form.mensagem}
                      onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                      placeholder="Descreva brevemente o que você precisa..."
                      className="bg-background border-border min-h-[80px] resize-none text-sm"
                      maxLength={1000}
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex items-start gap-2">
                <Checkbox
                  id="lgpd-contato"
                  checked={lgpd}
                  onCheckedChange={(v) => setLgpd(v === true)}
                  className="mt-0.5"
                />
                <label htmlFor="lgpd-contato" className="text-[11px] text-muted-foreground leading-relaxed cursor-pointer">
                  Concordo em receber comunicações do IBRP conforme a{" "}
                  <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Política de Privacidade</a>.
                </label>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-white h-9 text-sm">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Enviar mensagem <Send className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContatoSection;
