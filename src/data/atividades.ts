export interface Atividade {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  local: string;
  tipo: 'Workshop' | 'Palestra' | 'Evento';
}

export const atividades: Atividade[] = [
  {
    id: "ws-cyber-seguranca",
    titulo: "Workshop: Segurança Cibernética no Dia a Dia",
    data: "2026-05-15",
    horario: "14:00 - 17:00",
    local: "Auditório Central",
    tipo: "Workshop"
  },
  {
    id: "pal-futuro-ia",
    titulo: "Palestra: O Impacto da IA na Carreira Acadêmica",
    data: "2026-06-02",
    horario: "19:30 - 21:00",
    local: "Híbrido (Online/Bloco A)",
    tipo: "Palestra"
  }
];
