export interface Projeto {
  slug: string;
  titulo: string;
  resumo: string;
  descricao: string;
  area: string;
  status: 'Ativo' | 'Concluído';
  dataInicio: string;
}

export const projetos: Projeto[] = [
  {
    slug: "sistema-monitoramento-ambiental",
    titulo: "Monitoramento Ambiental IoT",
    resumo: "Rede de sensores para monitoramento da qualidade do ar em tempo real.",
    descricao: "Desenvolvimento de dispositivos de baixo custo para coleta de dados ambientais em áreas urbanas, integrando sensores de CO2, umidade e temperatura com visualização em dashboard real-time.",
    area: "Meio Ambiente / Tecnologia",
    status: "Ativo",
    dataInicio: "2025-01-10"
  },
  {
    slug: "alfabetizacao-digital-senior",
    titulo: "Alfabetização Digital Sênior",
    resumo: "Inclusão digital para a terceira idade focada em segurança e comunicação.",
    descricao: "Oficinas práticas para ensinar idosos a utilizarem smartphones e computadores com segurança, combatendo a exclusão digital e prevenindo golpes virtuais.",
    area: "Educação / Inclusão",
    status: "Ativo",
    dataInicio: "2024-03-15"
  }
];
