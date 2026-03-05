import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoHorizontal from "@/assets/logo-horizontal-black.png";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "NR-1", href: "#servicos" },
  { label: "Palestras", href: "#palestras" },
  { label: "Cursos", href: "#cursos" },
  { label: "Artigos", href: "/blog" },
];

const clientLinks = [
  { label: "Questionário", href: "https://gestaoriscospsicossociais.com.br/questionario" },
  { label: "Ambiente Virtual de Aprendizagem", href: "https://gestaoriscospsicossociais.com.br/ava" },
];

const scrollToContato = () => {
  const el = document.getElementById("contato");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const NavLink = ({ item, onClick }: { item: typeof navItems[0]; onClick?: () => void }) => {
  const isInternal = item.href.startsWith("/");
  const className = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

  if (isInternal) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <img src={logoHorizontal} alt="IBRP - Instituto Brasileiro de Riscos Psicossociais" className="h-10 md:h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <Button
            className="bg-gradient-brand hover:opacity-90 transition-opacity"
            onClick={scrollToContato}
          >
            Solicitar Diagnóstico
          </Button>
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              className="inline-flex items-center gap-1.5"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Área do Cliente <ChevronDown className="h-4 w-4" />
            </Button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg py-2 z-50">
                {clientLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label} <ExternalLink className="h-3 w-3 ml-auto" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} onClick={() => setIsOpen(false)} />
          ))}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Área do Cliente</span>
            {clientLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label} <ExternalLink className="h-3 w-3" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
