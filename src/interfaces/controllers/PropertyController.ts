import { Request, Response, NextFunction } from 'express';
import CreateProperty from '../../application/usecases/CreateProperty';
import GetProperties from '../../application/usecases/GetProperties';
import GetPropertyById from '../../application/usecases/GetPropertyById';
import UpdateProperty from '../../application/usecases/UpdateProperty';
import DeleteProperty from '../../application/usecases/DeleteProperty';
import PrismaPropertyRepository from '../../infrastructure/db/PrismaPropertyRepository';

// Ensamblamos las dependencias aquí
const repository = new PrismaPropertyRepository();
const createProperty    = new CreateProperty(repository);
const getProperties     = new GetProperties(repository);
const getPropertyById   = new GetPropertyById(repository);
const updateProperty    = new UpdateProperty(repository);
const deleteProperty    = new DeleteProperty(repository);

export class PropertyController {

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page, limit, location, minPrice, maxPrice } = req.query as any;
      const result = await getProperties.execute({ 
        page, limit, location, minPrice, maxPrice 
      });
      res.status(200).json({ ok: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params as any;
      const property = await getPropertyById.execute(id);
      res.status(200).json({ ok: true, data: property });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const property = await createProperty.execute(req.body);
      res.status(201).json({ ok: true, data: property });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params as any;
      const property = await updateProperty.execute(id, req.body);
      res.status(200).json({ ok: true, data: property });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params as any;
      await deleteProperty.execute(id);
      res.status(200).json({ ok: true, message: 'Propiedad eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }
}