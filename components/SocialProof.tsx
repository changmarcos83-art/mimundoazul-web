'use client';

import { useEffect, useRef, useState } from 'react';

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(target * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return <span ref={ref}>{value}</span>;
}

export function SocialProof() {
  return (
    <section className="social-proof">
      <div className="container social-proof-container">
        <div className="stat-item">
          <h3 className="stat-number">
            <Counter target={100} />+
          </h3>
          <p className="stat-label">Familias Felices</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">
            <Counter target={40} />+
          </h3>
          <p className="stat-label">Juegos Didácticos</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">
            <Counter target={100} />%
          </h3>
          <p className="stat-label">Aprendizaje Seguro</p>
        </div>
      </div>
    </section>
  );
}
