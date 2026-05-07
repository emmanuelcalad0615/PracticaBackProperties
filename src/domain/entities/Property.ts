interface PropertyProps {
  title: string;
  price: number;
  location: string;
  available?: boolean;
}

export default class Property {
  title: string;
  price: number;
  location: string;
  available: boolean;

  constructor({ title, price, location, available = true }: PropertyProps) {
    if (!title || title.trim().length < 3) {
      throw new Error('El título es requerido y debe tener al menos 3 caracteres');
    }

    if (!price || typeof price !== 'number' || price <= 0) {
      throw new Error('El precio debe ser un número mayor a 0');
    }

    if (!location || location.trim().length < 2) {
      throw new Error('La ubicación es requerida');
    }

    if (typeof available !== 'boolean') {
      throw new Error('El campo available debe ser true o false');
    }

    this.title     = title.trim();
    this.price     = price;
    this.location  = location.trim();
    this.available = available;
  }
}