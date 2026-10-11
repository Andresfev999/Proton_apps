import { cache } from 'react';
import { getApps, getAppBySlug } from './store';
export const getPublicApps = cache(async () => (await getApps()).filter(app => app.status === 'published' || app.status === 'beta'));
export const getPublicApp = cache(async (slug: string) => {
  const app = await getAppBySlug(slug);
  return app && (app.status === 'published' || app.status === 'beta') ? app : null;
});
