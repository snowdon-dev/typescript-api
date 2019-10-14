import { asClass, asValue, createContainer, InjectionMode } from 'awilix';

import { db } from '../data/database';
import * as joi from 'joi';

import { ApplicationErrorFactoryImpl } from '../data/core/errors/application-error-factory.impl';

import { RegisterInteractor } from '../app/register/register.interactor';
import { RegisterPresenterIml } from './presenter/register/register.presenter.impl';
import { RegisterValidatorImpl } from '../data/register/register.validator.impl';
import { RegisterRepositoryImpl } from '../data/register/register.repository.impl';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
container.register({
  db: asValue(db),
  joi: asValue(joi),

  errorFactory: asClass(ApplicationErrorFactoryImpl),

  registerInteractor: asClass(RegisterInteractor),
  registerPresenter: asClass(RegisterPresenterIml),
  registerValidator: asClass(RegisterValidatorImpl),
  registerRepository: asClass(RegisterRepositoryImpl),
});

export const app = {
  container,
};
