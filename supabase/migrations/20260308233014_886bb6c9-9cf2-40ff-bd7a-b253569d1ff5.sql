CREATE TABLE public.curso_gestao_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  nome text NOT NULL,
  email text NOT NULL
);

ALTER TABLE public.curso_gestao_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on curso_gestao_leads"
  ON public.curso_gestao_leads
  FOR INSERT
  WITH CHECK (true);