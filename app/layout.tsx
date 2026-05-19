import type { Metadata } from 'next';
import './globals.css';
import './legacy.css';
import { CartProvider } from '@/lib/cart';

export const metadata: Metadata = {
  title: 'Mi Mundo Azul | La diversión de tu niño al alcance de tus manos',
  description: 'Tienda de juegos didácticos premium para niños',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="light-theme">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
