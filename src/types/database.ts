export type AppStatus = 'published' | 'beta' | 'archived';
export type AppPlatform = 'android' | 'ios' | 'web';
export type AppCategory = 'Productividad' | 'Seguridad' | 'Utilidades' | 'Finanzas' | 'Comunicación' | 'Desarrollo' | 'Negocios';

export interface AppScreenshot {
  id: string;
  app_id: string;
  image_url: string;
  caption?: string;
  display_order: number;
  created_at?: string;
}

export interface Release {
  id: string;
  app_id: string;
  version_name: string;
  version_code: number;
  platform: AppPlatform;
  changelog: string;
  apk_file_url: string;
  apk_size_bytes: number;
  min_os_version: string;
  is_critical: boolean;
  download_count: number;
  sha256_hash?: string;
  published_at: string;
  created_at?: string;
}

export interface App {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon_url: string;
  cover_image_url?: string;
  category: AppCategory;
  package_name: string;
  platforms: AppPlatform[];
  play_store_url?: string;
  app_store_url?: string;
  github_url?: string;
  status: AppStatus;
  created_at: string;
  updated_at: string;
  // Relaciones cargadas opcionalmente
  latest_release?: Release;
  releases?: Release[];
  screenshots?: AppScreenshot[];
  total_downloads?: number;
}

export interface UpdateCheckResponse {
  has_update: boolean;
  is_critical?: boolean;
  latest_version?: string;
  latest_version_code?: number;
  current_version_code?: number;
  download_url?: string;
  direct_apk_url?: string;
  store_url?: string;
  file_size?: string;
  min_os_version?: string;
  published_at?: string;
  changelog?: string;
  message?: string;
}
