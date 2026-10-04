import { App, Release, AppScreenshot, AppPlatform } from '@/types/database';
import { INITIAL_APPS, INITIAL_RELEASES, INITIAL_SCREENSHOTS } from './data';
import { supabase, isSupabaseConfigured } from './supabase';

// Memoria local para fallback reactivo en tiempo de ejecución
let memoryApps: App[] = [...INITIAL_APPS];
let memoryReleases: Release[] = [...INITIAL_RELEASES];
let memoryScreenshots: Record<string, AppScreenshot[]> = { ...INITIAL_SCREENSHOTS };

export async function getApps(): Promise<App[]> {
  // Mapa de apps base en memoria con sus releases y capturas
  const memoryMap = new Map<string, App>();
  for (const app of memoryApps) {
    const appReleases = memoryReleases.filter((r) => r.app_id === app.id);
    const sortedReleases = [...appReleases].sort((a, b) => b.version_code - a.version_code);
    const totalDownloads = appReleases.reduce((sum, r) => sum + (r.download_count || 0), 0);
    memoryMap.set(app.slug, {
      ...app,
      latest_release: sortedReleases[0] || undefined,
      screenshots: memoryScreenshots[app.id] || [],
      total_downloads: totalDownloads
    });
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: appsData, error } = await supabase
        .from('apps')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && appsData) {
        // Enriquecer cada app de Supabase
        for (const app of appsData) {
          const { data: rels } = await supabase!
            .from('releases')
            .select('*')
            .eq('app_id', app.id)
            .order('version_code', { ascending: false })
            .limit(1);

          const { data: allRels } = await supabase!
            .from('releases')
            .select('download_count')
            .eq('app_id', app.id);

          const totalDownloads = (allRels || []).reduce((acc, r) => acc + (Number(r.download_count) || 0), 0);

          const { data: screens } = await supabase!
            .from('app_screenshots')
            .select('*')
            .eq('app_id', app.id)
            .order('display_order', { ascending: true });

          const existingMem = memoryMap.get(app.slug);
          // Supabase sobreescribe o complementa
          memoryMap.set(app.slug, {
            ...existingMem,
            ...app,
            video_url: app.video_url || existingMem?.video_url,
            latest_release: rels?.[0] || existingMem?.latest_release,
            screenshots: (screens && screens.length > 0) ? screens : (memoryScreenshots[app.id] || []),
            total_downloads: totalDownloads > 0 ? totalDownloads : (existingMem?.total_downloads || 0)
          } as App);
        }
      }
    } catch (err) {
      console.warn('Fallback a almacenamiento en memoria para getApps:', err);
    }
  }

  return Array.from(memoryMap.values());
}

export async function getAppBySlug(slug: string): Promise<App | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: appData, error } = await supabase
        .from('apps')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && appData) {
        const { data: rels } = await supabase
          .from('releases')
          .select('*')
          .eq('app_id', appData.id)
          .order('version_code', { ascending: false });

        const { data: screens } = await supabase
          .from('app_screenshots')
          .select('*')
          .eq('app_id', appData.id)
          .order('display_order', { ascending: true });

        const totalDownloads = (rels || []).reduce((acc, r) => acc + (Number(r.download_count) || 0), 0);

        return {
          ...appData,
          video_url: appData.video_url || memoryApps.find((a) => a.slug === slug)?.video_url,
          releases: rels || [],
          latest_release: rels?.[0] || undefined,
          screenshots: screens || [],
          total_downloads: totalDownloads
        } as App;
      }
    } catch (err) {
      console.warn('Fallback a almacenamiento en memoria para getAppBySlug:', err);
    }
  }

  const app = memoryApps.find((a) => a.slug === slug);
  if (!app) return null;

  const appReleases = memoryReleases
    .filter((r) => r.app_id === app.id)
    .sort((a, b) => b.version_code - a.version_code);

  const screens = memoryScreenshots[app.id] || [];
  const totalDownloads = appReleases.reduce((sum, r) => sum + (r.download_count || 0), 0);

  return {
    ...app,
    releases: appReleases,
    latest_release: appReleases[0] || undefined,
    screenshots: screens,
    total_downloads: totalDownloads
  };
}

export async function getLatestRelease(appIdOrSlug: string, platform: AppPlatform = 'android'): Promise<{ app: App; release: Release | null } | null> {
  let app: App | null = null;
  
  if (isSupabaseConfigured && supabase) {
    try {
      // Buscar por slug o id
      const { data: appData } = await supabase
        .from('apps')
        .select('*')
        .or(`id.eq.${appIdOrSlug},slug.eq.${appIdOrSlug}`)
        .single();

      if (appData) {
        app = appData as App;
        const { data: relData } = await supabase
          .from('releases')
          .select('*')
          .eq('app_id', app.id)
          .eq('platform', platform)
          .order('version_code', { ascending: false })
          .limit(1);

        return {
          app,
          release: relData?.[0] || null
        };
      }
    } catch (err) {
      console.warn('Fallback a memoria para getLatestRelease:', err);
    }
  }

  app = memoryApps.find((a) => a.slug === appIdOrSlug || a.id === appIdOrSlug) || null;
  if (!app) return null;

  const releases = memoryReleases
    .filter((r) => r.app_id === app!.id && r.platform === platform)
    .sort((a, b) => b.version_code - a.version_code);

  return {
    app,
    release: releases[0] || null
  };
}

export async function getReleaseById(releaseId: string): Promise<{ release: Release; app: App } | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: releaseData } = await supabase
        .from('releases')
        .select('*, apps(*)')
        .eq('id', releaseId)
        .single();

      if (releaseData && releaseData.apps) {
        const app = releaseData.apps as unknown as App;
        return {
          release: releaseData as Release,
          app
        };
      }
    } catch (err) {
      console.warn('Fallback a memoria para getReleaseById:', err);
    }
  }

  const release = memoryReleases.find((r) => r.id === releaseId);
  if (!release) return null;

  const app = memoryApps.find((a) => a.id === release.app_id);
  if (!app) return null;

  return { release, app };
}

export async function incrementDownload(releaseId: string): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.rpc('increment_release_download', { p_release_id: releaseId });
      const { data } = await supabase
        .from('releases')
        .select('download_count')
        .eq('id', releaseId)
        .single();
      if (data) return Number(data.download_count);
    } catch (err) {
      console.warn('Error llamando rpc increment_release_download en Supabase, aplicando local:', err);
    }
  }

  const release = memoryReleases.find((r) => r.id === releaseId);
  if (release) {
    release.download_count = (release.download_count || 0) + 1;
    return release.download_count;
  }
  return 0;
}

export async function addApp(appInput: Omit<App, 'id' | 'created_at' | 'updated_at'>): Promise<App> {
  const newApp: App = {
    ...appInput,
    id: `app-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('apps')
        .insert([newApp])
        .select()
        .single();
      if (!error && data) return data as App;
    } catch (err) {
      console.warn('Error agregando app a Supabase, guardando en memoria:', err);
    }
  }

  memoryApps.unshift(newApp);
  return newApp;
}

export async function addRelease(releaseInput: Omit<Release, 'id' | 'download_count' | 'published_at' | 'created_at'>): Promise<Release> {
  const newRelease: Release = {
    ...releaseInput,
    id: `rel-${Date.now()}`,
    download_count: 0,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('releases')
        .insert([newRelease])
        .select()
        .single();
      if (!error && data) return data as Release;
    } catch (err) {
      console.warn('Error agregando release a Supabase, guardando en memoria:', err);
    }
  }

  memoryReleases.unshift(newRelease);
  return newRelease;
}
