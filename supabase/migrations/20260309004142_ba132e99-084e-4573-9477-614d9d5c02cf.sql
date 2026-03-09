
-- SECURITY FIX: Replace RESTRICTIVE INSERT policies with PERMISSIVE ones
-- RESTRICTIVE policies require an additional PERMISSIVE policy to pass — without one,
-- all inserts are silently blocked. Recreating as PERMISSIVE (the correct type for allow-rules).
-- Server-side length validation is added in WITH CHECK for defense-in-depth.

-- newsletter_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on newsletter_leads" ON public.newsletter_leads;
CREATE POLICY "Allow anonymous inserts on newsletter_leads"
  ON public.newsletter_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    length(nome) <= 100 AND
    length(email) <= 255
  );

-- contato_empresas_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on contato_empresas_leads" ON public.contato_empresas_leads;
CREATE POLICY "Allow anonymous inserts on contato_empresas_leads"
  ON public.contato_empresas_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    length(nome) <= 100 AND
    length(email) <= 255 AND
    length(empresa) <= 200 AND
    length(cargo) <= 100 AND
    (mensagem IS NULL OR length(mensagem) <= 1000)
  );

-- curso_gestao_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on curso_gestao_leads" ON public.curso_gestao_leads;
CREATE POLICY "Allow anonymous inserts on curso_gestao_leads"
  ON public.curso_gestao_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    length(nome) <= 100 AND
    length(email) <= 255
  );

-- curso_pics_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on curso_pics_leads" ON public.curso_pics_leads;
CREATE POLICY "Allow anonymous inserts on curso_pics_leads"
  ON public.curso_pics_leads
  FOR INSERT
  TO anon
  WITH CHECK (
    length(nome) <= 100 AND
    length(email) <= 255
  );
