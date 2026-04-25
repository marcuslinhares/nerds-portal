export interface Curso {
  slug: string;
  titulo: string;
  cargaHoraria: string;
  status: 'Inscrições Abertas' | 'Em Breve' | 'Encerrado';
  ementa: string[];
}

export const cursos: Curso[] = [
  {
    slug: "desenvolvimento-web-moderno",
    titulo: "Desenvolvimento Web com Astro e React",
    cargaHoraria: "40h",
    status: "Inscrições Abertas",
    ementa: ["Fundamentos de Web", "Astro SSG", "Componentes React", "Deploy e Performance"]
  },
  {
    slug: "introducao-python-dados",
    titulo: "Introdução ao Python para Análise de Dados",
    cargaHoraria: "32h",
    status: "Em Breve",
    ementa: ["Sintaxe Python", "Pandas & Numpy", "Visualização de Dados"]
  }
];
