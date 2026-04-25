import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projetos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projetos" }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    descricao: z.string(),
    area: z.string(),
    status: z.enum(['Ativo', 'Concluído']),
    dataInicio: z.string(),
  })
});

const cursos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/cursos" }),
  schema: z.object({
    titulo: z.string(),
    cargaHoraria: z.string(),
    status: z.enum(['Inscrições Abertas', 'Em Breve', 'Encerrado']),
    ementa: z.array(z.string()),
  })
});

const atividades = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/atividades" }),
  schema: z.object({
    titulo: z.string(),
    data: z.string(),
    horario: z.string(),
    local: z.string(),
    tipo: z.enum(['Workshop', 'Palestra', 'Evento']),
  })
});

export const collections = {
  'projetos': projetos,
  'cursos': cursos,
  'atividades': atividades,
};
