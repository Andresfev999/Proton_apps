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
  title: { default: 'Proton Apps — Tu tienda de aplicaciones Android', template: '%s | Proton Apps' },
  description: 'Descubre aplicaciones Android para tus finanzas, productividad y entretenimiento. Explora capturas y descarga archivos APK oficiales directamente en tu teléfono.',
  alternates: { canonical: 'https://protondev.space/apps' },
  openGraph: {
    title: 'Proton Apps - Tienda Oficial de Aplicaciones Android',
    description: 'Catálogo oficial de aplicaciones Android verificadas, utilidades y herramientas de alta productividad.',
    url: 'https://protondev.space/apps',
    siteName: 'Proton Apps',
    locale: 'es_CO',
    type: 'website'
  },
};

export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-emerald-100 selection:text-emerald-800">
        <a href="#main-content" className="skip-link">Saltar al contenido</a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
