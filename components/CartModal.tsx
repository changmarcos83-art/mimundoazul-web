'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart';
import { buildWhatsappLink } from '@/lib/whatsapp';
import type { Configuracion } from '@/lib/api';

interface Props {
  open: boolean;
  onClose: () => void;
  config: Configuracion;
}

export function CartModal({ open, onClose, config }: Props) {
  const { items, total, count, setCantidad, remove, clear } = useCart();

  // Bloquea el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const onFinish = () => {
    const numero = config.whatsapp_numero || '+593968876233';
    const inicial = config.wsp_mensaje_inicial || 'Hola! Quiero comprar:';
    const final = config.wsp_mensaje_final || '¿Cómo coordinamos el pago y la entrega?';
    const link = buildWhatsappLink(numero, items, total, inicial, final);
    window.open(link, '_blank');
  };

  return (
    <div className={`cart-overlay ${open ? 'active' : ''}`} onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>🛒 Tu Carrito {count > 0 && <span style={{ opacity: 0.6, fontSize: 14 }}>({count})</span>}</h2>
          <button className="cart-close-btn" onClick={onClose}>&times;</button>
        </div>

        {count === 0 ? (
          <div className="cart-empty" style={{ display: 'block' }}>
            <span>🧸</span>
            <p>Tu carrito está vacío</p>
            <small>¡Agrega productos del catálogo!</small>
          </div>
        ) : (
          <>
            <div className="cart-modal-body">
              {items.map((it) => (
                <div
                  key={it.id}
                  style={{
                    display: 'flex',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                      background: '#f3f4f6',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {it.imagenUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={it.imagenUrl}
                        alt={it.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : null}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{it.nombre}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>${it.precio.toFixed(2)} c/u</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                      <button
                        onClick={() => setCantidad(it.id, it.cantidad - 1)}
                        style={qtyBtnStyle}
                        aria-label="Quitar uno"
                      >
                        −
                      </button>
                      <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>
                        {it.cantidad}
                      </span>
                      <button
                        onClick={() => setCantidad(it.id, it.cantidad + 1)}
                        style={qtyBtnStyle}
                        aria-label="Agregar uno"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(it.id)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          color: '#dc2626',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, color: '#1d4ed8' }}>
                    ${(it.precio * it.cantidad).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-modal-footer">
              <div className="cart-total">Total: ${total.toFixed(2)}</div>
              {config.pasarela_pago_activa !== 'true' && (
                <p style={{ fontSize: 12, color: '#64748b', textAlign: 'center', marginBottom: 8 }}>
                  {config.pasarela_pago_mensaje || '💳 Próximamente: pago con tarjeta'}
                </p>
              )}
              <div className="cart-actions">
                <button className="btn-cancel-order" onClick={clear}>
                  ✖ Vaciar
                </button>
                <button className="btn-finish-order" onClick={onFinish}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Terminar Pedido por WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 6,
  border: '1px solid rgba(0,0,0,0.1)',
  background: 'white',
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
};
