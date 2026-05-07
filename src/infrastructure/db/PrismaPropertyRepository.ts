// src/infrastructure/db/PrismaPropertyRepository.ts
import prisma from './prismaClient';
import Property from '../../domain/entities/Property';
import { 
  IPropertyRepository, 
  FindAllParams,
  FindAllResult,
  PropertyUpdateData
} from '../../domain/repositories/IPropertyRepository';

class PrismaPropertyRepository implements IPropertyRepository {

  async save(property: Property): Promise<Property> {
    return prisma.property.create({
      data: {
        title:     property.title,
        price:     property.price,
        location:  property.location,
        available: property.available,
      }
    });
  }

  async findAll({ offset, limit, filters }: FindAllParams): Promise<FindAllResult> {
    const where: any = {};

    if (filters.location) {
      where.location = { contains: filters.location, mode: 'insensitive' };
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }

    const [data, total] = await Promise.all([
      prisma.property.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.property.count({ where })
    ]);

    return { data, total };
  }

  async findById(id: number): Promise<Property | null> {
    return prisma.property.findUnique({
      where: { id }
    });
  }

  async update(id: number, data: PropertyUpdateData): Promise<Property> {
    return prisma.property.update({
      where: { id },
      data
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.property.delete({
      where: { id }
    });
  }

}

export default PrismaPropertyRepository;