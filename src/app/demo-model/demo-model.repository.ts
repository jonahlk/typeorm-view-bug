import {DemoModel}        from './demo-model.entity';
import {EntityRepository} from 'typeorm';
import {BaseRepository}   from '../../database/base-repository';


@EntityRepository(DemoModel)
export class DemoModelRepository extends BaseRepository<DemoModel> {
  async someCustomMethod() {
    return 'Your custom remote method works too 👏';
  }
}

