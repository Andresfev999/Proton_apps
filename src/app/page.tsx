import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomeContent } from '@/components/HomeContent';
import { getPublicApps } from '@/lib/public-apps';

export const dynamic = 'force-dynamic';
export default async function HomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [apps, params] = await Promise.all([getPublicApps(), searchParams]);
  const text = (key: string, fallback: string) => typeof params[key] === 'string' ? params[key] as string : fallback;
  const category = text('category', 'Todas');
  const sort = text('sort', 'recommended');
  return <><Navbar /><HomeContent apps={apps} initialFilters={{q:text('q',''),category:apps.some(app => app.category === category) ? category : 'Todas',sort:['recommended','latest','name'].includes(sort) ? sort : 'recommended'}} /><Footer /></>;
}
