'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Producto } from './api';

export interface CartItem {
  id: number;
  sku: string;          // código del producto (se muestra en el mensaje de WhatsApp)
  nombre: string;
  precio: number;       // precio efectivo (promo si aplica, si no normal)
  imagenUrl?: string | null;
  cantidad: number;
}

interface CartCtx {
  items: CartItem[];
  total: number;
  count: number;
  add: (producto: Producto) => void;
  remove: (id: number) => void;
  setCantidad: (id: number, cantidad: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx>({
  items: [],
  total: 0,
  count: 0,
  add: () => {},
  remove: () => {},
  setCantidad: () => {},
  clear: () => {},
});

const STORAGE_KEY = 'mma_cart_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hidratado, setHidratado] = useState(false);

  // Al cargar, recupero el carrito del localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignorar */
    }
    setHidratado(true);
  }, []);

  // Cada vez que cambia, lo guardo
  useEffect(() => {
    if (!hidratado) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hidratado]);

  const add = (p: Producto) => {
    const precio = p.precioPromo ? Number(p.precioPromo) : Number(p.precio);
    setItems((prev) => {
      const existe = prev.find((i) => i.id === p.id);
      if (existe) {
        return prev.map((i) =>
          i.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i,
        );
      }
      return [
        ...prev,
        {
          id: p.id,
          sku: p.sku,
          nombre: p.nombre,
          precio,
          imagenUrl: p.imagenUrl,
          cantidad: 1,
        },
      ];
    });
  };

  const remove = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const setCantidad = (id: number, cantidad: number) =>
    setItems((prev) =>
      cantidad <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, cantidad } : i)),
    );

  const clear = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const count = items.reduce((sum, i) => sum + i.cantidad, 0);

  return (
    <Ctx.Provider value={{ items, total, count, add, remove, setCantidad, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
