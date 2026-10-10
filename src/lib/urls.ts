/** Next Link adds basePath; native links and fetch require it explicitly. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://protondev.space').replace(/\/$/, '').replace(/\/apps$/, '');
export const BASE_PATH = '/apps';
export const appHref = (slug: string) => `/${encodeURIComponent(slug)}`;
export const downloadHref = (releaseId: string) => `${BASE_PATH}/api/v1/download/${encodeURIComponent(releaseId)}`;
export const publicAppUrl = (slug: string) => `${SITE_URL}${BASE_PATH}${appHref(slug)}`;
