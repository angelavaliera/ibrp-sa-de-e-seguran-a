import type { BlogArticle } from "./blog-types";

export const mockArticles: BlogArticle[] = [
  {
    slug: "nr1-atualizacao-2025-o-que-muda",
    title: "NR-1 Atualização 2025: O Que Muda na Gestão de Riscos Psicossociais",
    subtitle: "O novo texto da norma traz obrigações claras para empregadores. Saiba o que fazer agora.",
    coverImage: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&q=80",
    coverCaption: "Equipe em reunião de planejamento",
    coverCredit: "Unsplash / Campaign Creators",
    category: "NR-1",
    author: "Equipe IBRP",
    guestAuthor: {
      name: "Dra. Mariana Costa",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964f137?w=200&h=200&q=80&fit=crop",
      bio: "Psicóloga organizacional com 15 anos de experiência em saúde mental corporativa. Doutora em Psicologia do Trabalho pela USP e consultora de empresas Fortune 500 na implementação de programas de bem-estar.",
      linkedin: "https://linkedin.com/in/exemplo",
      instagram: "https://instagram.com/exemplo",
      email: "mariana@exemplo.com",
    },
    publishedAt: "2025-05-15",
    readTime: 8,
    excerpt: "A atualização da NR-1 em 2025 inclui pela primeira vez a obrigatoriedade de avaliação de riscos psicossociais no PGR. Entenda o que muda e como se preparar.",
    body: `<p>A Norma Regulamentadora nº 1 (NR-1) passou por uma atualização significativa em 2025, tornando obrigatória a inclusão de <strong>riscos psicossociais</strong> no Programa de Gerenciamento de Riscos (PGR).</p>
<p>Isso significa que todas as empresas, independentemente do porte, precisam identificar, avaliar e mitigar fatores como estresse ocupacional, assédio moral, sobrecarga de trabalho e falta de autonomia.</p>
<h2>O que são riscos psicossociais?</h2>
<p>São aspectos do trabalho que podem causar danos psicológicos ou físicos aos colaboradores. Entre os principais estão:</p>
<ul>
<li>Carga de trabalho excessiva</li>
<li>Falta de controle sobre as tarefas</li>
<li>Relações interpessoais conflituosas</li>
<li>Insegurança no emprego</li>
<li>Ausência de reconhecimento</li>
</ul>
<h2>O que as empresas devem fazer?</h2>
<p>O primeiro passo é realizar um <strong>inventário psicossocial</strong> — uma avaliação estruturada que mapeia os fatores de risco presentes no ambiente de trabalho. A partir desse diagnóstico, deve-se elaborar um plano de ação com medidas preventivas e corretivas.</p>
<p>Empresas que não se adequarem estão sujeitas a multas, interdições e ações trabalhistas. Mais do que isso, ignorar a saúde mental dos colaboradores impacta diretamente na produtividade e nos resultados do negócio.</p>`,
    dataHighlight: {
      value: "855",
      label: "novos fiscais do trabalho",
      description: "O governo federal autorizou a contratação de 855 novos auditores-fiscais para intensificar as inspeções.",
    },
    sources: [
      { name: "Ministério do Trabalho e Emprego", url: "https://www.gov.br/trabalho-e-emprego" },
      { name: "Organização Internacional do Trabalho (OIT)" },
    ],
    metaTitle: "NR-1 2025: Riscos Psicossociais Agora São Obrigatórios | IBRP",
    metaDescription: "Entenda as mudanças da NR-1 em 2025 e como adequar sua empresa à gestão obrigatória de riscos psicossociais no PGR.",
  },
  {
    slug: "roi-saude-mental-empresas",
    title: "O ROI da Saúde Mental: Por Que Investir em Bem-Estar É Lucrativo",
    subtitle: "Dados concretos mostram que cada real investido retorna até 10 vezes em produtividade.",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    coverCaption: "Colaboradores em sessão de bem-estar",
    coverCredit: "Unsplash / Jason Goodman",
    category: "Saúde Mental",
    author: "Equipe IBRP",
    publishedAt: "2025-04-28",
    readTime: 6,
    excerpt: "Programas de saúde mental corporativa geram retorno mensurável. Veja os dados que comprovam o impacto positivo no resultado financeiro.",
    body: `<p>A saúde mental no trabalho deixou de ser um tema de responsabilidade social para se tornar uma <strong>estratégia de negócio</strong>. Estudos da OMS demonstram que programas bem estruturados de prevenção e promoção da saúde mental geram um retorno sobre investimento (ROI) significativo.</p>
<p>Empresas que implementam programas abrangentes observam redução no absenteísmo, queda no turnover e aumento da produtividade — fatores que impactam diretamente a receita.</p>
<h2>Os números falam</h2>
<p>De acordo com dados consolidados pela Organização Mundial da Saúde, cada US$ 1 investido em tratamento para transtornos mentais comuns gera um retorno de US$ 4 em melhoria da saúde e produtividade.</p>
<p>No Brasil, considerando o cenário agravado pela pandemia e pela cultura de presenteísmo, esse retorno pode ser ainda maior quando se incluem os custos evitados com processos trabalhistas e substituição de pessoal.</p>`,
    dataHighlight: {
      value: "1.000%",
      label: "de ROI em saúde mental",
      description: "Cada R$1 investido em programas de bem-estar gera até R$10 de retorno em produtividade e redução de custos.",
    },
    sources: [
      { name: "Organização Mundial da Saúde (OMS)", url: "https://www.who.int" },
      { name: "Deloitte — Mental Health Report 2024" },
    ],
    metaTitle: "ROI da Saúde Mental: Dados Reais de Retorno | IBRP",
    metaDescription: "Descubra como investir em saúde mental gera até 1.000% de ROI para empresas, com dados da OMS e Deloitte.",
  },
  {
    slug: "lideranca-saude-mental-papel-gestor",
    title: "O Papel do Líder na Saúde Mental da Equipe",
    subtitle: "Como a liderança empática transforma o clima organizacional e previne o burnout.",
    coverImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    coverCaption: "Líder em conversa com sua equipe",
    coverCredit: "Unsplash / LinkedIn Sales",
    category: "Liderança",
    author: "Equipe IBRP",
    publishedAt: "2025-04-10",
    readTime: 7,
    excerpt: "Gestores têm impacto direto no bem-estar dos colaboradores. Descubra como a liderança pode ser a primeira linha de prevenção.",
    body: `<p>O gestor é, muitas vezes, o fator mais determinante na experiência do colaborador. Pesquisas mostram que o relacionamento com a liderança direta é o principal preditor de satisfação — ou insatisfação — no trabalho.</p>
<p>Uma liderança que pratica a <strong>escuta ativa</strong>, distribui cargas de trabalho de forma justa e reconhece o esforço da equipe contribui significativamente para a prevenção de transtornos como ansiedade e burnout.</p>
<h2>Competências essenciais</h2>
<ul>
<li>Inteligência emocional e empatia</li>
<li>Comunicação não-violenta</li>
<li>Gestão de conflitos</li>
<li>Flexibilidade e adaptabilidade</li>
</ul>
<p>Treinar líderes nessas competências não é apenas ético — é estratégico. Equipes com lideranças preparadas apresentam menor rotatividade e maior engajamento.</p>`,
    sources: [
      { name: "Gallup — State of the Global Workplace 2024" },
      { name: "Harvard Business Review" },
    ],
    metaTitle: "Liderança e Saúde Mental: O Papel do Gestor | IBRP",
    metaDescription: "Entenda como líderes empáticos previnem burnout e transformam o clima organizacional com práticas baseadas em evidências.",
  },
  {
    slug: "burnout-acoes-trabalhistas-crescimento",
    title: "Burnout e Ações Trabalhistas: O Crescimento de 2.200%",
    subtitle: "O esgotamento profissional se tornou uma das maiores fontes de litígio trabalhista no Brasil.",
    coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    coverCaption: "Documentos jurídicos sobre a mesa",
    coverCredit: "Unsplash / Scott Graham",
    category: "Casos Jurídicos",
    author: "Equipe IBRP",
    publishedAt: "2025-03-22",
    readTime: 9,
    excerpt: "O número de processos trabalhistas por burnout cresceu mais de 2.200%. Entenda as implicações jurídicas e como proteger sua empresa.",
    body: `<p>Nos últimos anos, o Brasil assistiu a um crescimento exponencial de ações trabalhistas relacionadas ao <strong>burnout</strong> e a transtornos mentais ocupacionais. O aumento de mais de 2.200% coloca empresas de todos os portes em risco jurídico significativo.</p>
<p>A Síndrome de Burnout, reconhecida pela OMS como fenômeno ocupacional desde 2022, pode gerar indenizações por dano moral, pensionamento e até estabilidade provisória para o trabalhador afastado.</p>
<h2>Como se proteger juridicamente?</h2>
<p>A melhor defesa é a prevenção documentada. Empresas que mantêm registros de avaliações de risco psicossocial, programas de prevenção e treinamentos de liderança possuem argumentos sólidos em eventuais disputas judiciais.</p>
<ul>
<li>Realize inventários psicossociais periodicamente</li>
<li>Documente todas as ações preventivas</li>
<li>Treine gestores para identificar sinais de esgotamento</li>
<li>Mantenha canais de escuta confidenciais</li>
</ul>`,
    dataHighlight: {
      value: "+2.200%",
      label: "em ações por burnout",
      description: "Crescimento no volume de processos trabalhistas relacionados ao esgotamento profissional no Brasil.",
    },
    sources: [
      { name: "Tribunal Superior do Trabalho (TST)" },
      { name: "Organização Mundial da Saúde (OMS)" },
      { name: "Ministério Público do Trabalho" },
    ],
    metaTitle: "Burnout: Crescimento de 2.200% em Ações Trabalhistas | IBRP",
    metaDescription: "O burnout gerou um aumento de 2.200% em ações trabalhistas. Saiba como proteger sua empresa com prevenção documentada.",
  },
];
