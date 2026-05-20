'use client';

import { useEffect, useState } from 'react';
import { api, type Producto, type Configuracion, type Testimonio } from '@/lib/api';
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
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    // allSettled: si uno falla, los otros siguen funcionando.
    // Por ejemplo, si /testimonios todavía no está deployado (404),
    // los productos y la configuración igual cargan.
    Promise.allSettled([
      api.get<Producto[]>('/productos'),
      api.get<Configuracion>('/configuracion'),
      api.get<Testimonio[]>('/testimonios'),
    ])
      .then(([p, c, t]) => {
        if (p.status === 'fulfilled') setProductos(p.value.data);
        if (c.status === 'fulfilled') setConfig(c.value.data);
        if (t.status === 'fulfilled') setTestimonios(t.value.data);
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
      <Testimonios testimonios={testimonios} />
      <CtaFinal config={config} />
      <Footer config={config} />
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} config={config} />
    </>
  );
}
