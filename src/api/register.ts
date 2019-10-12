import { asClass, asValue, createContainer, InjectionMode } from 'awilix';

import { RegisterInteractor } from '../app/register/register.interactor';
import { RegisterPresenterIml } from './presenter/register/register.presenter.impl';


const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
container.register({
    regsiterInteractor: asClass(RegisterInteractor),
    registerPresenter: asClass(RegisterPresenterIml),
    // registerValidator: asClass()
    // registerRepository: asClass()
});

export const app = { 
    container,
}