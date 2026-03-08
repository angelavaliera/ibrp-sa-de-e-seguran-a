CREATE TABLE public.leads_cursopics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  nome text NOT NULL,
  email text NOT NULL
);

ALTER TABLE public.leads_cursopics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts on leads_cursopics"
ON public.leads_cursopics
FOR INSERT
WITH CHECK (true);