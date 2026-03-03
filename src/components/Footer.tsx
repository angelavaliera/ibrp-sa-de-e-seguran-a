import logoHorizontal from "@/assets/logo-horizontal-black.png";
import { ExternalLink } from "lucide-react";

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@IBRP.riscos.psicossociais",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ibrp.riscos.psicossociais/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ibrp/",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/20 py-14">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <img src={logoHorizontal} alt="IBRP" className="h-10 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
              Instituto Brasileiro de Riscos Psicossociais. Ciência, acolhimento e transformação para ambientes de trabalho mais saudáveis.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#inicio" className="hover:text-foreground transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-foreground transition-colors">Soluções NR-1</a></li>
              <li><a href="#palestras" className="hover:text-foreground transition-colors">Palestras</a></li>
              <li><a href="#cursos" className="hover:text-foreground transition-colors">Cursos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Links Úteis</h4>
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
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          © 2025 IBRP — Instituto Brasileiro de Riscos Psicossociais. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
