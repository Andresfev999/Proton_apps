import type { MetadataRoute } from 'next';
import { getPublicApps } from '@/lib/public-apps';
import { SITE_URL, publicAppUrl } from '@/lib/urls';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apps = await getPublicApps();
  return [{url:`${SITE_URL}/apps`,changeFrequency:'weekly',priority:1}, ...apps.map(app => ({url:publicAppUrl(app.slug),lastModified:app.updated_at,changeFrequency:'weekly' as const,priority:.8})), {url:`${SITE_URL}/apps/privacy`,priority:.3},{url:`${SITE_URL}/apps/terms`,priority:.3},{url:`${SITE_URL}/apps/developers`,priority:.4}];
}
