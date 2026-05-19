'use client';

import { useEffect, useState } from 'react';
import { api, type Producto, type Configuracion } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SocialProof } from '@/components/SocialProof';
import { Catalogo } from '@/components/Catalogo';
import { Testimonios } from '@/components/Testimonios';
import { CtaFinal } from '@/components/CtaFinal';
import { Footer } from '@/components/Footer';
import { CartModal } from '@/components/CartModal';

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [config, setConfig] = useState<Configuracion>({});
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get<Producto[]>('/productos'),
      api.get<Configuracion>('/configuracion'),
    ])
      .then(([p, c]) => {
        setProductos(p.data);
        setConfig(c.data);
      })
      .catch((err) => {
        console.error('Error cargando datos:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          color: '#6b7280',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Cargando…
      </div>
    );
  }

  return (
    <>
      <Navbar config={config} onCartOpen={() => setCartOpen(true)} />
      <Hero config={config} />
      <SocialProof />
      <Catalogo productos={productos} />
      <Testimonios />
      <CtaFinal config={config} />
      <Footer config={config} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} config={config} />
    </>
  );
}
