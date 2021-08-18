import {Controller, Get, Route, Tags} from 'tsoa';
import {DemoModelRepository}          from './demo-model.repository';
import {getCustomRepository}          from 'typeorm';
import {DemoModel}                    from './demo-model.entity';


@Tags('Demo Model')
@Route('/api/demo-model')
export class DemoModelController extends Controller {

  @Get('/count')
  async count(): Promise<number> {
    return getCustomRepository(DemoModelRepository).count();
  }

  @Get('/test')
  async test(): Promise<string> {
    return getCustomRepository(DemoModelRepository).someCustomMethod();
  }

  async create(): Promise<DemoModel | DemoModel[]> {
    return getCustomRepository(DemoModelRepository).create({id: 1, email: '', password: ''}, {});
  }

}