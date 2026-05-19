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

  return (
    <div
      ref={cardRef}
      className={`product-card ${visible ? 'animate-in' : ''}`}
      data-product-id={producto.id}
    >
      <div className="product-img-wrap">
        <div className="product-card-inner">
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
      </div>
      <div className="product-info">
        <h3 className="product-name">{producto.nombre}</h3>
        <p className="product-sku">{producto.sku}</p>
        {precioOriginal ? (
          <p className="product-promo">
            Promo: ${precio.toFixed(2)}{' '}
            <span className="product-old-price">${precioOriginal.toFixed(2)}</span>
          </p>
        ) : (
          <p className="product-promo">${precio.toFixed(2)}</p>
        )}
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
      </div>
    </div>
  );
}
