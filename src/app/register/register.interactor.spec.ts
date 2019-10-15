import { RegisterInteractor } from './register.interactor';
import { TestEnvironment } from '../../test-environment';
import { RegisterInput } from './register.in';
import { RegisterOutput } from './register.out';
import { ValidatorResult } from '../core/definitions/validator-result';

const validatorResult: ValidatorResult = { valid: true, error: null };
const insertResult = { id: 10 };

function isRegisterOutput(output: RegisterOutput): output is RegisterOutput {
  return (output as RegisterOutput) !== undefined;
}

describe('Register interactor', () => {
  let interactor: RegisterInteractor;
  let RegisterValidator;
  let RegisterRepository;
  let errorFactory;

  beforeEach(() => {
    RegisterValidator = {
      validate: jest.fn(() => {
        return validatorResult;
      }),
    };

    RegisterRepository = {
      findUserByUsername: jest.fn(async () => Promise.resolve(null)),
      createUser: jest.fn(async () => Promise.resolve(insertResult)),
    };

    errorFactory = {
      getError: jest.fn(() => new Error('user')),
    };

    interactor = TestEnvironment.createInstance(RegisterInteractor, [
      {
        name: 'registerValidator',
        useValue: RegisterValidator,
      },
      {
        name: 'registerRepository',
        useValue: RegisterRepository,
      },
      {
        name: 'errorFactory',
        useValue: errorFactory,
      },
    ]) as RegisterInteractor;
  });

  describe('execute', () => {
    it('should works', async () => {
      const request: RegisterInput = {
        firstname: 'JOHN',
        lastname: 'Connan',
        email: 'johnconnan@jk.com',
        username: 'johnconnan',
        password: 'passwd',
      };

      const response = await interactor.execute(request);
      const isCorrectResponse = isRegisterOutput(response);
      expect(isCorrectResponse).toBeTruthy();
    });
  });
});
