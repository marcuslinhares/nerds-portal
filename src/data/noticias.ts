export interface Noticia {
  slug: string;
  titulo: string;
  data: string;
  resumo: string;
}

export const noticias: Noticia[] = [
  {
    slug: "lancamento-novo-portal",
    titulo: "Portal de Extensão Universitária Ganha Nova Identidade Visual",
    data: "2026-04-25",
    resumo: "O novo design focado em acessibilidade e estética Cyber-Academic já está no ar."
  },
  {
    slug: "abertura-editais-2026",
    titulo: "Abertos os Editais para Projetos de Extensão 2026",
    data: "2026-04-10",
    resumo: "Confira os prazos e requisitos para submeter sua proposta de impacto social."
  }
];
