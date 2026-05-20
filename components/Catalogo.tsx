'use client';

import { useEffect, useRef, useState } from 'react';
import type { Producto } from '@/lib/api';
import { useCart } from '@/lib/cart';

export function Catalogo({ productos }: { productos: Producto[] }) {
  const { add } = useCart();

  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="section-header">
          <h2>Nuestro Catálogo Educativo</h2>
          <p>
            Descubre juegos diseñados específicamente para potenciar las habilidades de los más
            pequeños de la casa de forma divertida y creativa.
          </p>
        </div>

        {productos.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: 40 }}>
            <p>Pronto tendremos productos disponibles. Vuelve más tarde.</p>
          </div>
        ) : (
          <div className="services-grid" id="servicesGrid">
            {productos.map((p) => (
              <ProductCard key={p.id} producto={p} onAdd={() => add(p)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ producto, onAdd }: { producto: Producto; onAdd: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [feedback, setFeedback] = useState(false);

  // Animación de entrada cuando el card aparece en pantalla
  useEffect(() => {
    if (!cardRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const handleAdd = () => {
    onAdd();
    setFeedback(true);
    setTimeout(() => setFeedback(false), 800);
  };

  const precio = producto.precioPromo
    ? Number(producto.precioPromo)
    : Number(producto.precio);
  const precioOriginal = producto.precioPromo ? Number(producto.precio) : null;

  const review =
    producto.descripcion ||
    '¡Excelente juego didáctico diseñado para estimular el aprendizaje y desarrollo de los más pequeños!';

  const agotado = producto.agotado === true;

  return (
    <div
      ref={cardRef}
      className={`product-card ${visible ? 'animate-in' : ''}`}
      data-product-id={producto.id}
      style={agotado ? { position: 'relative' } : undefined}
    >
      <div
        className="product-img-wrap"
        style={agotado ? { position: 'relative' } : undefined}
      >
        <div
          className="product-card-inner"
          style={agotado ? { filter: 'grayscale(80%) opacity(0.6)' } : undefined}
        >
          <div className="product-card-front">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={producto.imagenUrl || '/images/logo.png'}
              alt={producto.nombre}
              className="product-img"
              loading="lazy"
            />
          </div>
          <div className="product-card-back">
            <div className="review-content">
              <span className="review-quote">❝</span>
              <p className="review-text">{review}</p>
              <span className="review-quote-end">❞</span>
            </div>
          </div>
        </div>
        {agotado && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-8deg)',
              background: 'rgba(15, 23, 42, 0.9)',
              color: 'white',
              padding: '10px 24px',
              borderRadius: 8,
              fontWeight: 900,
              letterSpacing: 2,
              fontSize: 18,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            AGOTADO
          </div>
        )}
      </div>
      <div className="product-info" style={agotado ? { opacity: 0.7 } : undefined}>
        <h3 className="product-name">{producto.nombre}</h3>
        <p className="product-sku">{producto.sku}</p>
        {precioOriginal ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              flexWrap: 'wrap',
              margin: '4px 0 12px',
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: '#9ca3af',
                textDecoration: 'line-through',
                fontWeight: 500,
              }}
            >
              ${precioOriginal.toFixed(2)}
            </span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#dc2626',
              }}
            >
              ${precio.toFixed(2)}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: '#fee2e2',
                color: '#991b1b',
                padding: '2px 6px',
                borderRadius: 4,
                letterSpacing: 0.5,
              }}
            >
              PROMO
            </span>
          </div>
        ) : (
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#1d4ed8',
              margin: '4px 0 12px',
            }}
          >
            ${precio.toFixed(2)}
          </p>
        )}
        {agotado ? (
          <button
            className="btn-add-cart"
            disabled
            style={{
              background: '#9ca3af',
              cursor: 'not-allowed',
              opacity: 0.7,
            }}
          >
            Agotado por el momento
          </button>
        ) : (
          <button
            className="btn-add-cart"
            onClick={handleAdd}
            style={{
              background: feedback ? '#16a34a' : undefined,
              transform: feedback ? 'scale(0.95)' : undefined,
            }}
          >
            {feedback ? '✓ Agregado' : 'Añadir al carrito'}
          </button>
        )}
      </div>
    </div>
  );
}
