import Property from '../entities/Property';

export interface PropertyFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface FindAllParams {
  offset: number;
  limit: number;
  filters: PropertyFilters;
}

export interface FindAllResult {
  data: Property[];
  total: number;
}

export interface PropertyUpdateData {
  title?: string;
  price?: number;
  location?: string;
  available?: boolean;
}

export interface IPropertyRepository {
  save(property: Property): Promise<Property>;
  findAll(params: FindAllParams): Promise<FindAllResult>;
  findById(id: number): Promise<Property | null>;
  update(id: number, data: PropertyUpdateData): Promise<Property>;
  delete(id: number): Promise<void>;
}