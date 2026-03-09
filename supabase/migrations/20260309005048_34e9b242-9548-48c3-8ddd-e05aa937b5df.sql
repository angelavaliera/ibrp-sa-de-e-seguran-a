
-- =============================================
-- FIX: Drop all existing RESTRICTIVE INSERT policies
-- and replace with PERMISSIVE ones + add SELECT deny
-- =============================================

-- 1. newsletter_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on newsletter_leads" ON public.newsletter_leads;
CREATE POLICY "Allow public inserts on newsletter_leads"
  ON public.newsletter_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(nome) <= 100
    AND length(email) <= 255
  );

CREATE POLICY "Deny all reads on newsletter_leads"
  ON public.newsletter_leads
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- 2. contato_empresas_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on contato_empresas_leads" ON public.contato_empresas_leads;
CREATE POLICY "Allow public inserts on contato_empresas_leads"
  ON public.contato_empresas_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(nome) <= 100
    AND length(email) <= 255
    AND length(empresa) <= 200
    AND length(cargo) <= 100
    AND (mensagem IS NULL OR length(mensagem) <= 1000)
  );

CREATE POLICY "Deny all reads on contato_empresas_leads"
  ON public.contato_empresas_leads
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- 3. curso_gestao_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on curso_gestao_leads" ON public.curso_gestao_leads;
CREATE POLICY "Allow public inserts on curso_gestao_leads"
  ON public.curso_gestao_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(nome) <= 100
    AND length(email) <= 255
  );

CREATE POLICY "Deny all reads on curso_gestao_leads"
  ON public.curso_gestao_leads
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- 4. curso_pics_leads
DROP POLICY IF EXISTS "Allow anonymous inserts on curso_pics_leads" ON public.curso_pics_leads;
CREATE POLICY "Allow public inserts on curso_pics_leads"
  ON public.curso_pics_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(nome) <= 100
    AND length(email) <= 255
  );

CREATE POLICY "Deny all reads on curso_pics_leads"
  ON public.curso_pics_leads
  FOR SELECT
  TO anon, authenticated
  USING (false);
