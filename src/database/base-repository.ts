import {AbstractRepository, DeepPartial, UpdateResult} from 'typeorm';


interface Filter<Entity> {
  fields?: string | Object | Array<string>,
  include?: string | Object | Array<string>,
  limit?: number,
  order?: { [P in keyof Entity]?: 'ASC' | 'DESC' },
  where?: Partial<Entity>
}

export class BaseRepository<Entity> extends AbstractRepository<Entity> {

  async count(): Promise<number> {
    return this.repository.count();
  }

  async create(data: Entity | Entity[], options: Object): Promise<Entity | Entity[]> {
    return this.repository.save(data as Entity);

  }

  async destroyAll(where: Partial<Entity>, options: Object): Promise<{ count: number }> {
    const deletedEntities = await this.repository.delete(where);

    return {count: deletedEntities.affected || 0};
  }

  async destroyById(id: number, options: Object): Promise<void> {
    const entityToBeRemoved = await this.findById(id, {}, options);
    await this.repository.remove(entityToBeRemoved);
  }

  async exists(id: number, options: Object): Promise<boolean> {
    const entity = await this.findById(id, {}, options);
    return !!entity;
  }

  async find(filter: Filter<Entity>, options: Object): Promise<Entity[]> {
    return this.repository.find(filter);
  }

  async findById(id: number, filter: Filter<Entity>, options: Object): Promise<Entity> {
    const entity = await this.repository.findOne(id, filter);
    if (!entity) {
      throw new Error('Not found'); // TODO: Create Error classes for Internal, NotFound, Validation
    }
    return entity;
  }

  async findOne(filter: Filter<Entity>, options: Object): Promise<Entity> {
    const entity = await this.repository.findOne(filter);
    if (!entity) {
      throw new Error('Not found'); // TODO: Create Error classes for Internal, NotFound, Validation
    }
    return entity;
  }

  async findOrCreate(filter: Filter<Entity>, data: Entity, options: Object): Promise<Entity> {
    let entity = await this.repository.findOne(filter);

    if (!entity) {
      entity = await this.repository.save(data);
    }
    return entity;
  }

  async replaceById(id: number, data: Partial<Entity>, options: Object): Promise<Entity> {
    const entity = this.findById(id, {}, options);
    if (!entity) {
      throw new Error('Not found');
    }
    return this.repository.save({...data, id} as any);
  }

  async replaceOrCreate(data: Entity, options: Object): Promise<Entity> {

    // @ts-ignore
    const id = data.id;
    const entity = await this.findById(id, {}, options);

    if (!entity) {
      return this.replaceById(id, data, options);
    }

    return entity;
  }

  async updateAll(where: Partial<Entity>, data: Partial<Entity>, options: Object): Promise<UpdateResult> {
    return this.repository.update(where, data as DeepPartial<Entity>);
  }

  async upsert(data: Entity, options: Object): Promise<Entity> {
    // @ts-ignore
    const id: number = data.id;
    let entity;

    try {
      await this.findById(id, {}, options);
      entity = await this.repository.update(id, data);
    }
    catch(err) {
      entity = await this.create(data, options);
    }

    // @ts-ignore
    return entity;
  }

  async upsertWithWhere(where: Partial<Entity>, data: Entity, options: Object): Promise<Entity | Entity[]> {
    let entity: Entity | Entity[] = await this.find(where, options);

    if (entity) {
      await this.repository.update(where, data);
    }
    else {
      entity = await this.create(data, options);
    }

    return entity;
  }

}