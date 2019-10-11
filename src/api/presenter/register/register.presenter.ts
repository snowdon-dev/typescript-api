import { ID } from '../../../app/core/definitions/id';
import { Presenter, PresenterOutput } from '../../../app/core/definitions/presenter';
import { RegisterOutput } from '../../../app/register/register.out';

export interface RegisterPresenterOutput extends PresenterOutput {
  id: ID;
}

export interface RegisterPresenter extends Presenter<RegisterOutput> {
  present(data: RegisterOutput): Promise<RegisterPresenterOutput>;
}