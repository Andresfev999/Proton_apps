import type { Metadata, Viewport } from "next";
import { MotionProvider } from '@/components/MotionProvider';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://protondev.space'),
  title: { default: 'Proton Apps — aplicaciones Android para tu día a día', template: '%s | Proton Apps' },
  description: 'Descubre aplicaciones Android para tus finanzas, productividad y negocio. Explora sus capturas y descarga el APK directamente en tu teléfono.',
  alternates: { canonical: 'https://protondev.space/apps' },
  openGraph: { title: 'Proton Apps', description: 'Pequeñas apps. Grandes posibilidades. Descubre tu próxima app Android.', url: 'https://protondev.space/apps', siteName: 'Proton Apps', locale: 'es_CO', type: 'website' },
};
export const viewport: Viewport = { themeColor: '#080b14', colorScheme: 'dark' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080b11] text-slate-100">
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
