import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
});

export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  icono?: string | null;
  descripcion?: string | null;
  orden: number;
  activo: boolean;
}

export interface Producto {
  id: number;
  nombre: string;
  sku: string;
  descripcion?: string | null;
  precio: string;
  precioPromo?: string | null;
  imagenUrl?: string | null;
  stock: number;
  edadMin?: number | null;
  edadMax?: number | null;
  destacado: boolean;
  activo: boolean;
  orden: number;
  categoriaId?: number | null;
  categoria?: Categoria | null;
}

export type Configuracion = Record<string, string>;
