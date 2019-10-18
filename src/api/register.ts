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
import { ShortenInteractor } from '../app/shorten/shorten.interactor';
import { ShortenValidatorImpl } from '../data/shorten/shorten.validator.impl';
import { ShortenRepositoryImpl } from '../data/shorten/shorten.repository.impl';
import { FindLinkInteractor } from '../app/find-link/find-link.interactor';
import { FindLinkRepositoryImpl } from '../data/find-link/find-link.repository.impl';
import { FindLinkValidatorImpl } from '../data/find-link/find-link.validator.impl';
import { RecordHitInteractor } from '../app/record-hit/record-hit.interactor';
import { RecordHitRepositoryImpl } from '../data/record-hit/record-hit.repository.impl';
import { RecordHitValidatorImpl } from '../data/record-hit/record-hit.validator.impl';

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

  shortenInteractor: asClass(ShortenInteractor),
  shortenValidator: asClass(ShortenValidatorImpl),
  shortenRepository: asClass(ShortenRepositoryImpl),

  findLinkInteractor: asClass(FindLinkInteractor),
  findLinkRepository: asClass(FindLinkRepositoryImpl),
  findLinkValidator: asClass(FindLinkValidatorImpl),

  recordHitInteractor: asClass(RecordHitInteractor),
  recordHitRepository: asClass(RecordHitRepositoryImpl),
  recordHitValidator: asClass(RecordHitValidatorImpl),
});

export const app = {
  container,
};
