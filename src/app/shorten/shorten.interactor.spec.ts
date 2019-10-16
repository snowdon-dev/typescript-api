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


  describe('execute validation fails', () => {
    beforeEach(() => {
      shortenRepository = {
        storeShortLink: jest.fn(async () => null),
        ensureUniqueGUID: jest.fn(async () => null),
      };
      shortenValidator = {
        validate: jest.fn(() => {
          return {
            valid: false,
            error: true,
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

    it('fails', async () => {
      const request: ShortenInput = {
        awinaffid: '556',
        awinmid: '73',
        endpoint: 'https://accident.snowdon.dev',
      };
      try {
        await interactor.execute(request);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('shorten');
      }
    })
  });

  describe('execute works', () => {
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

    it('works', async () => {
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
