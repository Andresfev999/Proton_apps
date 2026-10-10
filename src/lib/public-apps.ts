import { cache } from 'react';
import { getApps, getAppBySlug } from './store';
export const getPublicApps = cache(async () => (await getApps()).filter(app => app.status !== 'archived'));
export const getPublicApp = cache(async (slug: string) => {
  const app = await getAppBySlug(slug);
  return app && app.status !== 'archived' ? app : null;
});
