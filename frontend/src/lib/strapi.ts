export type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
};

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchFromStrapi<T>(path: string, query?: Record<string, string | number | boolean>): Promise<T> {
  const url = new URL(path, STRAPI_URL);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, String(value));
    }
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.STRAPI_API_TOKEN ? `Bearer ${process.env.STRAPI_API_TOKEN}` : ''
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error(`Strapi request failed: ${res.status}`);
    }

    return res.json() as Promise<T>;
  } catch (error) {
    console.error('Strapi fetch error:', error);
    // Return empty data structure to prevent crashes
    return {} as T;
  }
}

export function buildStrapiMedia(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}



