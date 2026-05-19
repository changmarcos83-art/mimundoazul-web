import type { CartItem } from './cart';

/**
 * Arma el link de WhatsApp con el mensaje del pedido pre-escrito.
 *
 * - `numero`  → del admin (ej: "+593991234567" o "593991234567")
 * - `items`   → líneas del carrito
 * - `inicial` → texto inicial configurado en el admin
 * - `final`   → texto final configurado en el admin
 */
export function buildWhatsappLink(
  numero: string,
  items: CartItem[],
  total: number,
  inicial: string,
  final: string,
): string {
  const numeroLimpio = numero.replace(/[^0-9]/g, ''); // wa.me NO admite "+" ni espacios

  const lineas = items.map(
    (i) => `• ${i.cantidad}x ${i.nombre} ($${i.precio.toFixed(2)} c/u)`,
  );

  const mensaje = [
    inicial || 'Hola! Quiero comprar:',
    '',
    ...lineas,
    '',
    `Total: $${total.toFixed(2)}`,
    '',
    final || '¿Cómo coordinamos el pago y la entrega?',
  ].join('\n');

  return `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
}

/** Genera link de WhatsApp simple (sin carrito), para botones "Contáctanos". */
export function buildWhatsappSimpleLink(numero: string, mensaje?: string): string {
  const numeroLimpio = numero.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${numeroLimpio}`;
  return mensaje ? `${url}?text=${encodeURIComponent(mensaje)}` : url;
}
