'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart';
import { buildWhatsappSimpleLink } from '@/lib/whatsapp';
import type { Configuracion } from '@/lib/api';

export function Navbar({
  config,
  onCartOpen,
}: {
  config: Configuracion;
  onCartOpen: () => void;
}) {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const numeroWsp = config.whatsapp_numero || '+593968876233';
  const telefonoMostrar = config.telefono || numeroWsp;
  const logoUrl = config.logo_url || '/images/logo.png';
  const nombreMarca = config.nombre_marca || 'Mi Mundo Azul';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-content">
        <a href="#inicio" className="brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt={`${nombreMarca} Logo`} className="brand-logo" />
          <span className="brand-name">{nombreMarca}</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#inicio" className="nav-link" onClick={() => setMenuOpen(false)}>Inicio</a></li>
          <li><a href="#servicios" className="nav-link" onClick={() => setMenuOpen(false)}>Catálogo</a></li>
          <li><a href="#testimonios" className="nav-link" onClick={() => setMenuOpen(false)}>Testimonios</a></li>
        </ul>

        <div className="nav-actions">
          <button
            className="nav-icon cart-icon"
            onClick={onCartOpen}
            aria-label="Abrir carrito"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-count">{count}</span>
          </button>

          <div className="nav-whatsapp-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
            <a
              href={buildWhatsappSimpleLink(numeroWsp)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whatsapp-btn"
              style={{ marginBottom: 4 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              WhatsApp
            </a>
            <span className="whatsapp-number-sub" style={{ fontSize: 11, fontWeight: 600, color: '#38bdf8' }}>
              Cel. {telefonoMostrar}
            </span>
          </div>
        </div>

        <div
          className={`mobile-menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </div>
    </nav>
  );
}
