import { IPropertyRepository, PropertyFilters } from '../../domain/repositories/IPropertyRepository';

interface GetPropertiesInput {
  page?: number;
  limit?: number;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}

export default class GetProperties {
  constructor(private readonly propertyRepository: IPropertyRepository) {}

  async execute({ page = 1, limit = 10, location, minPrice, maxPrice }: GetPropertiesInput) {
    const offset = (page - 1) * limit;

    const filters: PropertyFilters = {};
    if (location) filters.location = location;
    if (minPrice)  filters.minPrice = Number(minPrice);
    if (maxPrice)  filters.maxPrice = Number(maxPrice);

    const { data, total } = await this.propertyRepository.findAll({ offset, limit, filters });

    return { data, total, page, limit };
  }
}
