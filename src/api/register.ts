import { asClass, asValue, createContainer, InjectionMode } from 'awilix';

import { db } from '../data/database';
import * as joi from 'joi';

import { ApplicationErrorFactoryImpl } from '../data/core/errors/application-error-factory.impl';

import { RegisterInteractor } from '../app/register/register.interactor';
import { RegisterPresenterIml } from './presenter/register/register.presenter.impl';
import { RegisterValidatorImpl } from '../data/register/register.validator.impl';
import { RegisterRepositoryImpl } from '../data/register/register.repository.impl';

import { FindUserInteractor } from '../app/find-user/find-user.interactor';
import { FindUserValidatorImpl } from '../data/find-user/find-user.validator.impl';
import { FindUserRepositoryImpl } from '../data/find-user/find-user.repository.impl';

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });
container.register({
  db: asValue(db),
  joi: asValue(joi),

  errorFactory: asClass(ApplicationErrorFactoryImpl),

  registerInteractor: asClass(RegisterInteractor),
  registerPresenter: asClass(RegisterPresenterIml),
  registerValidator: asClass(RegisterValidatorImpl),
  registerRepository: asClass(RegisterRepositoryImpl),

  findUserInteractor: asClass(FindUserInteractor),
  findUserRepository: asClass(FindUserRepositoryImpl),
  findUserValidator: asClass(FindUserValidatorImpl),
});

export const app = {
  container,
};
