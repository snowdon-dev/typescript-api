import { Input } from './input';
import { Output } from './output';
import { PresenterOutput, Presenter } from './presenter';

export interface Interactor {
  execute(request: Input): Promise<Output>;
}

export interface InteractorPresenter {
  present(): Promise<Output>;
}

export abstract class BaseInteractor implements Interactor, InterfacePresentor {
  protected presenter: Presenter;

  async present(request: Input): Promise<Output> {
    const result = this.execute(request);
    const response = this.presenter.present(result);
    return response;
  }
}
