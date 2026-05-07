import { IPropertyRepository } from '../../domain/repositories/IPropertyRepository';

export default class DeleteProperty {
  constructor(private readonly propertyRepository: IPropertyRepository) {}

  async execute(id: number): Promise<{ message: string }> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new Error('Propiedad no encontrada');
    }

    await this.propertyRepository.delete(id);

    return { message: 'Propiedad eliminada correctamente' };
  }
}
