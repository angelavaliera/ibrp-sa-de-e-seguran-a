import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "Página não encontrada | IBRP";
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <main className="text-center" role="main">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Página não encontrada</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Voltar para o início
        </a>
      </main>
    </div>
  );
};

export default NotFound;
