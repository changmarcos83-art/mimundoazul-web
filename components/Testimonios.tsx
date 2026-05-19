export function Testimonios() {
  return (
    <section className="testimonials" id="testimonios">
      <div className="container">
        <div className="section-header">
          <h2>Lo que dicen los padres</h2>
          <p>Nuestras familias confían en Mi Mundo Azul para el aprendizaje de sus hijos.</p>
        </div>
        <div className="testimonials-grid">
          <div className="glass-card testimonial-card">
            <div className="stars">★★★★★</div>
            <p>
              &ldquo;Los juegos de construcción han transformado completamente la forma en que mi
              hijo juega y aprende. ¡La calidad es premium y muy segura!&rdquo;
            </p>
            <div className="client-info">
              <div className="client-avatar"></div>
              <div>
                <h4>María Gómez</h4>
                <p>Mamá de Lucas (4 años)</p>
              </div>
            </div>
          </div>
          <div className="glass-card testimonial-card">
            <div className="stars">★★★★★</div>
            <p>
              &ldquo;Excelente atención y catálogo de productos. Los kits de arte estimulan su
              imaginación a niveles increíbles. Totalmente recomendado.&rdquo;
            </p>
            <div className="client-info">
              <div className="client-avatar"></div>
              <div>
                <h4>Carlos Ruiz</h4>
                <p>Papá de Sofía (6 años)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
