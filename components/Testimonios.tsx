import type { Testimonio } from '@/lib/api';

export function Testimonios({ testimonios }: { testimonios: Testimonio[] }) {
  // Si no hay ninguno cargado, no mostramos la sección
  if (testimonios.length === 0) return null;

  return (
    <section className="testimonials" id="testimonios">
      <div className="container">
        <div className="section-header">
          <h2>Lo que dicen los padres</h2>
          <p>Nuestras familias confían en Mi Mundo Azul para el aprendizaje de sus hijos.</p>
        </div>
        <div className="testimonials-grid">
          {testimonios.map((t) => (
            <div key={t.id} className="glass-card testimonial-card">
              <div className="stars">{'★'.repeat(t.estrellas)}</div>
              <p>&ldquo;{t.mensaje}&rdquo;</p>
              <div className="client-info">
                <div
                  className="client-avatar"
                  style={
                    t.avatarUrl
                      ? {
                          backgroundImage: `url(${t.avatarUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : undefined
                  }
                />
                <div>
                  <h4>{t.nombre}</h4>
                  {t.relacion && <p>{t.relacion}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
