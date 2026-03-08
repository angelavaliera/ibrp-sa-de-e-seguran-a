-- Rename tables
ALTER TABLE public.contact_leads RENAME TO contato_empresas_leads;
ALTER TABLE public.leads_cursopics RENAME TO curso_pics_leads;

-- Rename RLS policies to match new table names
ALTER POLICY "Allow anonymous inserts on contact_leads" ON public.contato_empresas_leads RENAME TO "Allow anonymous inserts on contato_empresas_leads";
ALTER POLICY "Allow anonymous inserts on leads_cursopics" ON public.curso_pics_leads RENAME TO "Allow anonymous inserts on curso_pics_leads";