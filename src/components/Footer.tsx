import logoHorizontal from "@/assets/logo-horizontal-black.png";
import { ExternalLink, Youtube, Instagram, Linkedin, ArrowRight } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@IBRP.riscos.psicossociais", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/ibrp.riscos.psicossociais/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ibrp/", icon: Linkedin },
];

const Footer = () => {
  return (
    <footer>
      {/* Social CTA band */}
      <div className="bg-primary py-14 text-primary-foreground">
        <div className="container mx-auto text-center">
          <p className="text-sm uppercase tracking-widest font-medium mb-3 opacity-80">Siga o IBRP</p>
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-8">
            Acompanhe nossos conteúdos nas redes sociais
          </h3>
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-14 h-14 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-all duration-300"
              >
                <s.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-border bg-muted/20 py-14">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-10">
            <div>
              <img src={logoHorizontal} alt="IBRP" className="h-14 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
                Instituto Brasileiro de Riscos Psicossociais. Ciência, acolhimento e transformação para ambientes de trabalho mais saudáveis.
              </p>
              <Button
                className="bg-gradient-brand hover:opacity-90 transition-opacity text-white"
                onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              >
                Solicitar Diagnóstico
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div>
              <h4 className="font-heading font-bold mb-4">Navegação</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#inicio" className="hover:text-foreground transition-colors">Início</a></li>
                <li><a href="#servicos" className="hover:text-foreground transition-colors">NR-1</a></li>
                <li><a href="#palestras" className="hover:text-foreground transition-colors">Palestras</a></li>
                <li><a href="#cursos" className="hover:text-foreground transition-colors">Cursos</a></li>
                <li><a href="#contato" className="hover:text-foreground transition-colors">Contato</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold mb-4">Plataformas</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://gestaoriscospsicossociais.com.br/questionario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                  >
                    Questionário <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://gestaoriscospsicossociais.com.br/ava"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                  >
                    Ambiente Virtual de Aprendizagem <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <NewsletterSignup variant="footer" />
            </div>
          </div>

          <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © 2025 IBRP — Instituto Brasileiro de Riscos Psicossociais. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
