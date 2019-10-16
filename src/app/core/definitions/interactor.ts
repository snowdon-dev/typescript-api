import { Input } from './input';
import { Output } from './output';
import { PresenterOutput, Presenter } from './presenter';

export interface Interactor {
  execute(request: Input): Promise<Output>;
}