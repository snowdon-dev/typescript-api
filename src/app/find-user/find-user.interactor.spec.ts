import { FindUserInteractor } from './find-user.interactor';
import { FindUserOutput } from './find-user.out';
import { FindUserInput } from './find-user.in';
import { TestEnvironment } from '../../test-environment';
import { ValidatorResult } from '../core/definitions/validator-result';

function isFindUserResponse(output: FindUserOutput): output is FindUserOutput {
  return (output as FindUserOutput) !== undefined;
}

describe('FindUser interactor', () => {
  let interactor: FindUserInteractor;
  let findUserValidator;
  let findUserRepository;
  let errorFactory;

  const truthyValidatorResult: ValidatorResult = { valid: true, error: null };
  const truthyFindResult = {
    id: 10,
    firstname: 'Snowdon',
    lastname: 'Dev',
    email: 'test@example.com',
    username: 'snowdon',
    password: 'asdfasdf',
  };

  beforeEach(() => {
    findUserValidator = {
      validate: jest.fn(() => {
        return truthyValidatorResult;
      }),
    };

    findUserRepository = {
      findUserByEmail: jest.fn(async () => truthyFindResult),
    };
    errorFactory = {
      getError: jest.fn(() => new Error('user')),
    };

    interactor = TestEnvironment.createInstance(FindUserInteractor, [
      {
        name: 'findUserValidator',
        useValue: findUserValidator,
      },
      {
        name: 'findUserRepository',
        useValue: findUserRepository,
      },
      {
        name: 'errorFactory',
        useValue: errorFactory,
      },
    ]) as FindUserInteractor;
  });

  describe('execute', () => {
    it('should works', async () => {
      const request: FindUserInput = { email: 'dksnowdon@gmail.com' };
      const response = await interactor.execute(request);
      const isCorrectResponse = isFindUserResponse(response);
      expect(isCorrectResponse).toBeTruthy();
      expect(response.user.id).toBe(10);
    });
  });
});
