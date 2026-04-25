export interface Membro {
  nome: string;
  papel: string;
  bio: string;
  email?: string;
}

export const equipe: Membro[] = [
  {
    nome: "Prof. Dr. Cyber Core",
    papel: "Coordenação Geral",
    bio: "Especialista em Sistemas Distribuídos e Inovação Acadêmica.",
    email: "coordenacao@universidade.edu.br"
  },
  {
    nome: "Msc. Matrix Lead",
    papel: "Gestão de Projetos",
    bio: "Mestre em Engenharia de Software com foco em Impacto Social.",
    email: "projetos@universidade.edu.br"
  },
  {
    nome: "Equipe Técnica",
    papel: "Desenvolvimento e Suporte",
    bio: "Corpo técnico dedicado à infraestrutura dos cursos e atividades.",
  }
];
