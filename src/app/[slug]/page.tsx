import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicApp } from '@/lib/public-apps';
import { publicAppUrl } from '@/lib/urls';
import AppDetailContent from '@/components/AppDetailContent';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const app = await getPublicApp((await params).slug);
  if (!app) return { title:'Aplicación no encontrada', robots:{index:false,follow:false} };
  return { title:`${app.name}: descarga para Android`, description:app.tagline, alternates:{canonical:publicAppUrl(app.slug)}, openGraph:{title:app.name,description:app.tagline,url:publicAppUrl(app.slug),type:'website'} };
}
export default async function AppPage({params}: Props) {
  const app = await getPublicApp((await params).slug);
  if (!app) notFound();
  return <AppDetailContent initialApp={app} />;
}
