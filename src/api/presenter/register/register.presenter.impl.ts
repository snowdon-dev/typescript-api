import { ID } from '../../../app/core/definitions/id';
import { RegisterOutput } from '../../../app/register/register.out';

import { RegisterPresenter, RegisterPresenterOutput } from './register.presenter';

export class RegisterPresenterIml implements RegisterPresenter {
  present(data: RegisterOutput): Promise<RegisterPresenterOutput> {
    return Promise.resolve({ id: data.user.id as ID });
  }
}
