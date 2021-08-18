import {AbstractRepository} from 'typeorm';


export class BaseRepository<Entity> extends AbstractRepository<Entity> {

  async count() {
    return this.repository.count();
  }

}