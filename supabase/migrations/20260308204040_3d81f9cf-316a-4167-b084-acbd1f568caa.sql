
-- Newsletter leads table
CREATE TABLE public.newsletter_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  perfil TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on newsletter_leads"
  ON public.newsletter_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Contact leads table
CREATE TABLE public.contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  empresa TEXT NOT NULL,
  cargo TEXT NOT NULL,
  tamanho TEXT,
  interesse TEXT,
  mensagem TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on contact_leads"
  ON public.contact_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
