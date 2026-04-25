export interface Parceiro {
  nome: string;
  tipo: string;
  descricao: string;
  url?: string;
}

export const parceiros: Parceiro[] = [
  {
    nome: "Tech Institute",
    tipo: "Institucional",
    descricao: "Parceiro estratégico em projetos de pesquisa e desenvolvimento.",
    url: "https://example.com"
  },
  {
    nome: "Global Cloud Foundation",
    tipo: "Apoio Tecnológico",
    descricao: "Fornecedora de infraestrutura para os cursos de capacitação.",
    url: "https://example.com"
  },
  {
    nome: "Prefeitura Municipal",
    tipo: "Governamental",
    descricao: "Articuladora de demandas sociais e logística regional.",
    url: "https://example.com"
  }
];
