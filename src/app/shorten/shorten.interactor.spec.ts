import { ShortenInteractor } from './shorten.interactor';
import { TestEnvironment } from '../../test-environment';
import { ValidatorResult } from '../core/definitions/validator-result';
import { ShortenInput } from './shorten.in';
import { ShortenOutput } from './shorten.out';

describe('Shorten interactor', () => {
  let interactor: ShortenInteractor;
  let shortenRepository;
  let shortenValidator;
  let errorFactory;

  beforeEach(() => {
    shortenRepository = {
      storeShortLink: jest.fn(async () => 10),
      ensureUniqueGUID: jest.fn(async () => true),
    };
    shortenValidator = {
      validate: jest.fn(() => {
        return {
          valid: true,
          error: null,
        };
      }),
    };
    errorFactory = {
      getError: jest.fn(() => new Error('shorten')),
    };

    interactor = TestEnvironment.createInstance(ShortenInteractor, [
      {
        name: 'shortenRepository',
        useValue: shortenRepository,
      },
      {
        name: 'shortenValidator',
        useValue: shortenValidator,
      },
      {
        name: 'errorFactory',
        useValue: errorFactory,
      }
    ]);
  });

  describe('execute', () => {
    it('should works', async () => {
      const request: ShortenInput = {
        awinaffid: '556',
        awinmid: '73',
        endpoint: 'https://accident.snowdon.dev',
      };
      const response = await interactor.execute(request);
      expect(typeof response.url).toBe('string');
    });
  })
});
