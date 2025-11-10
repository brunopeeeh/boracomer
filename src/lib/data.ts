import { z } from "zod";

export const lojaSchema = z.object({
  nome_empresa: z.string(),
  modelo_negocio: z.string().optional(),
  tipo_atendimento: z.string().optional(),
  Latitude: z.number(),
  Longitude: z.number(),
  img: z.string().optional(),
  horario_funcionamento: z
    .array(
      z.object({
        day_of_week: z.number(),
        day: z.string(),
        hours: z.array(
          z.object({
            start: z.string(),
            end: z.string(),
            type: z.string().optional(),
          }),
        ),
      }),
    )
    .optional(),
});

export const lojasResultSchema = z.object({
  result: z.array(lojaSchema),
});

export type Loja = z.infer<typeof lojaSchema>;

let lojasCache: Loja[] | null = null;
let bfsCache: Loja[] | null = null;

export async function loadLojas(): Promise<Loja[]> {
  if (lojasCache) return lojasCache;
  try {
    const res = await fetch("/lojas.json");
    if (!res.ok) return [];
    const json = await res.json();
    const parsed = lojasResultSchema.safeParse(json);
    if (!parsed.success) {
      console.warn("lojas.json inválido", parsed.error.flatten());
      return [];
    }
    lojasCache = parsed.data.result;
    return lojasCache;
  } catch (e) {
    console.warn("Falha ao carregar lojas.json", e);
    return [];
  }
}

export function clearLojasCache() {
  lojasCache = null;
}

export async function loadBfs(): Promise<Loja[]> {
  if (bfsCache) return bfsCache;
  try {
    const res = await fetch("/bfs.json");
    if (!res.ok) return [];
    const json = await res.json();
    const parsed = lojasResultSchema.safeParse(json);
    if (!parsed.success) {
      console.warn("bfs.json inválido", parsed.error.flatten());
      return [];
    }
    bfsCache = parsed.data.result;
    return bfsCache;
  } catch (e) {
    console.warn("Falha ao carregar bfs.json", e);
    return [];
  }
}