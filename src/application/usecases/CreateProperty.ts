import Property from '../../domain/entities/Property';
import { IPropertyRepository } from '../../domain/repositories/IPropertyRepository';

interface CreatePropertyInput {
  title: string;
  price: number;
  location: string;
  available?: boolean;
}

export default class CreateProperty {
  constructor(private readonly propertyRepository: IPropertyRepository) {}

  async execute({ title, price, location, available }: CreatePropertyInput): Promise<Property> {
    const property = new Property({ title, price, location, available });
    return this.propertyRepository.save(property);
  }
}
