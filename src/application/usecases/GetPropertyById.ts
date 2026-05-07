import Property from '../../domain/entities/Property';
import { IPropertyRepository } from '../../domain/repositories/IPropertyRepository';

export default class GetPropertyById {
  constructor(private readonly propertyRepository: IPropertyRepository) {}

  async execute(id: number): Promise<Property> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    return property;
  }
}
