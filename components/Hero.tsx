'use client';

import { useEffect, useRef } from 'react';
import { buildWhatsappSimpleLink } from '@/lib/whatsapp';
import type { Configuracion } from '@/lib/api';

export function Hero({ config }: { config: Configuracion }) {
  const particlesRef = useRef<HTMLDivElement>(null);

  // Genera las partículas flotantes del fondo (como en el sitio original)
  useEffect(() => {
    const el = particlesRef.current;
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 20 + 's';
      p.style.animationDuration = 15 + Math.random() * 10 + 's';
      el.appendChild(p);
    }
  }, []);

  const titulo = config.hero_titulo || 'Mi Mundo Azul';
  const subtitulo =
    config.hero_subtitulo ||
    'La diversión de tu niño al alcance de tus manos. Explora nuestra exclusiva tienda de venta de juegos didácticos diseñados para el desarrollo y el aprendizaje.';
  const heroImg = config.hero_imagen_url || '/images/hero_visual.png';
  const numeroWsp = config.whatsapp_numero || '+593968876233';

  return (
    <section className="hero" id="inicio">
      <div className="particles" ref={particlesRef} />
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-label">🧩 JUEGOS DIDÁCTICOS PREMIUM</span>
          <h1 className="hero-title" style={{ color: '#38bdf8' }}>
            {titulo}
            <br />
            <span className="glow-text" style={{ color: '#38bdf8' }}>Para Niños</span>
          </h1>
          <p className="hero-subtitle">{subtitulo}</p>
          <div className="hero-buttons">
            <a href="#servicios" className="btn-primary">Ver Catálogo</a>
            <a
              href={buildWhatsappSimpleLink(numeroWsp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Contáctanos
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="sphere">
            <div className="sphere-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImg} alt="Hero" className="hero-image animated-float" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
