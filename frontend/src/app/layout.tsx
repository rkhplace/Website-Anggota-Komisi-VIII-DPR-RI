import type { Metadata } from 'next';
import './globals.css';
import ScrollAnimations from '@/components/ScrollAnimations';

export const metadata: Metadata = {
  title: 'Anggota DPR RI - Situs Resmi',
  description: 'Website resmi anggota DPR RI. Berita, agenda, galeri, profil.',
  metadataBase: new URL('https://example.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body>
        <ScrollAnimations />
        {children}
      </body>
    </html>
  );
}



