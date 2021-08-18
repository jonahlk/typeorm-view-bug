import {DemoModel}        from '../../database/entities/demo-model';
import {EntityRepository} from 'typeorm';
import {BaseRepository}   from '../../database/entities/base/base-repository';


@EntityRepository(DemoModel)
export class DemoModelRepository extends BaseRepository<DemoModel> {
  async someCustomMethod() {
    return 'Your custom remote method works too 👏';
  }
}

