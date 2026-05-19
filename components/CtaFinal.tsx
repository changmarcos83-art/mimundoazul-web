'use client';

import { buildWhatsappSimpleLink } from '@/lib/whatsapp';
import type { Configuracion } from '@/lib/api';

export function CtaFinal({ config }: { config: Configuracion }) {
  const numeroWsp = config.whatsapp_numero || '+593968876233';
  const telefonoMostrar = config.telefono || numeroWsp;

  return (
    <section className="cta-final" id="contacto">
      <div className="container cta-container glass-card">
        <h2>¿Listo para impulsar el aprendizaje de tu hijo?</h2>
        <p>
          La diversión de tu niño al alcance de tus manos. Escríbenos por WhatsApp y te
          asesoraremos para elegir el mejor juego didáctico.
        </p>
        <div
          className="cta-whatsapp-wrapper"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <a
            href={buildWhatsappSimpleLink(numeroWsp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary cta-btn"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Chatear por WhatsApp
          </a>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#38bdf8' }}>
            Cel. {telefonoMostrar}
          </span>
        </div>
        {/* Mensaje "próximamente pago con tarjeta" */}
        {config.pasarela_pago_activa !== 'true' && (
          <p style={{ marginTop: 24, fontSize: 14, color: '#64748b', fontStyle: 'italic' }}>
            {config.pasarela_pago_mensaje || '💳 Próximamente: pago con tarjeta'}
          </p>
        )}
      </div>
    </section>
  );
}
