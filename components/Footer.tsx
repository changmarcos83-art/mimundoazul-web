import { buildWhatsappSimpleLink } from '@/lib/whatsapp';
import type { Configuracion } from '@/lib/api';

export function Footer({ config }: { config: Configuracion }) {
  const numeroWsp = config.whatsapp_numero || '+593968876233';
  const nombreMarca = config.nombre_marca || 'Mi Mundo Azul';
  const logoUrl = config.logo_url || '/images/logo.png';

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt={`${nombreMarca} Logo`} className="footer-logo" />
          <p>{nombreMarca}. Tienda de venta de juegos didácticos premium para niños.</p>
        </div>
        <div className="footer-links">
          <h4>Productos</h4>
          <ul>
            <li><a href="#servicios">Juegos Montessori</a></li>
            <li><a href="#servicios">Kits de Arte</a></li>
            <li><a href="#servicios">Lógica y Ciencia</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Atención</h4>
          <ul>
            <li>
              <a href={buildWhatsappSimpleLink(numeroWsp)} target="_blank" rel="noopener noreferrer">
                Atención por WhatsApp
              </a>
            </li>
            {config.instagram_url && (
              <li>
                <a href={config.instagram_url} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {config.facebook_url && (
              <li>
                <a href={config.facebook_url} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
            )}
            <li><a href="#">Términos y Condiciones</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} {nombreMarca}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
