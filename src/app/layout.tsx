import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layouts/main-layout';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const siteMetadata = {
  title: 'Cloud Walker',
  description:
    'A personal blog exploring software development and various other topics.',
  url: `https://${process.env.VERCEL_URL}` || 'https://yourwebsite.com',
};

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon-32x32.png', sizes: '32x32' },
      { url: '/android-chrome-192x192.png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
  },
  openGraph: {
    type: 'website',
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    images: [
      {
        url: '/android-chrome-192x192.png',
        width: 192,
        height: 192,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: '/android-chrome-192x192.png',
  },
};

const setInitialTheme = `
  (function() {
    const darkMode = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body className={`${nunitoSans.className} antialiased transition-colors`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
