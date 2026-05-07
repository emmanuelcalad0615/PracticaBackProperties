import Property from '../../domain/entities/Property';
import { IPropertyRepository, PropertyUpdateData } from '../../domain/repositories/IPropertyRepository';

export default class UpdateProperty {
  constructor(private readonly propertyRepository: IPropertyRepository) {}

  async execute(id: number, { title, price, location, available }: PropertyUpdateData): Promise<Property> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    const dataToUpdate: PropertyUpdateData = {};
    if (title     !== undefined) dataToUpdate.title     = title;
    if (price     !== undefined) dataToUpdate.price     = price;
    if (location  !== undefined) dataToUpdate.location  = location;
    if (available !== undefined) dataToUpdate.available = available;

    return this.propertyRepository.update(id, dataToUpdate);
  }
}
