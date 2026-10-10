import { permanentRedirect } from 'next/navigation';
export default async function LegacyAppPage({params}: {params:Promise<{slug:string}>}) {
  permanentRedirect(`/apps/${encodeURIComponent((await params).slug)}`);
}
