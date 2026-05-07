
import { z } from 'zod';

// Valida el body del POST y PUT
export const PropertyBodySchema = z.object({
  title:     z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  price:     z.number().positive('El precio debe ser mayor a 0'),
  location:  z.string().min(2, 'La ubicación es requerida'),
  available: z.boolean().optional().default(true),
});

// Valida el :id de los params
export const ParamIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'El id debe ser un número válido').transform(Number),
});

// Valida los query params del GET /properties
export const PropertyQuerySchema = z.object({
  location: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  page:     z.coerce.number().int().positive().default(1),
  limit:    z.coerce.number().int().positive().max(100).default(10),
});