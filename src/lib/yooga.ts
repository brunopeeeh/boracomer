import { z } from "zod";

// Schema parcial para os campos necessários da API de loja da Yooga
const yoogaAddressSchema = z.object({
  addressFormatted: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
}).partial();

const yoogaStoreSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  img: z.string().optional(),
  min_delivery_time: z.number().optional(),
  max_delivery_time: z.number().optional(),
  status_label: z.string().optional(),
  status_label_additional: z.string().optional(),
  delivery_fee: z.number().optional(),
  minimum_order: z.number().optional(),
  address: yoogaAddressSchema.optional(),
  delivery_fee_json: z.string().optional(),
});

export type YoogaStoreInfo = {
  name: string;
  description?: string;
  url?: string;
  img?: string;
  min_delivery_time?: number;
  max_delivery_time?: number;
  status_label?: string;
  status_label_additional?: string;
  delivery_fee?: number;
  minimum_order?: number;
  addressFormatted?: string;
  latitude?: number;
  longitude?: number;
};

let storeCache: Record<string, YoogaStoreInfo> = {};

export async function loadYoogaStore(slug: string): Promise<YoogaStoreInfo | null> {
  if (storeCache[slug]) return storeCache[slug];
  try {
    const res = await fetch(`https://delivery2.yooga.com.br/v2/stores/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    const parsed = yoogaStoreSchema.safeParse(json);
    if (!parsed.success) {
      console.warn("Yooga store inválida", parsed.error.flatten());
      return null;
    }
    const data = parsed.data;
    let latitude: number | undefined;
    let longitude: number | undefined;
    let addressFormatted: string | undefined = data.address?.addressFormatted;

    if (data.delivery_fee_json) {
      try {
        const fee = JSON.parse(data.delivery_fee_json);
        // Alguns ambientes usam fullAddress + latitude/longitude aqui
        addressFormatted = addressFormatted || fee?.fullAddress;
        if (typeof fee?.latitude === "number") latitude = fee.latitude;
        if (typeof fee?.longitude === "number") longitude = fee.longitude;
      } catch (e) {
        // Ignora erros de parse
      }
    }

    const info: YoogaStoreInfo = {
      name: data.name,
      description: data.description,
      url: data.url,
      img: data.img,
      min_delivery_time: data.min_delivery_time,
      max_delivery_time: data.max_delivery_time,
      status_label: data.status_label,
      status_label_additional: data.status_label_additional,
      delivery_fee: data.delivery_fee,
      minimum_order: data.minimum_order,
      addressFormatted,
      latitude,
      longitude,
    };
    storeCache[slug] = info;
    return info;
  } catch (e) {
    console.warn("Falha ao carregar loja Yooga", e);
    return null;
  }
}

export function clearYoogaStoreCache(slug?: string) {
  if (slug) delete storeCache[slug];
  else storeCache = {};
}