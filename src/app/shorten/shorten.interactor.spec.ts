import { ShortenInteractor } from './shorten.interactor';
import { TestEnvironment } from '../../test-environment';
import { ValidatorResult } from '../core/definitions/validator-result';
import { ShortenInput } from './shorten.in';
import { ShortenOutput } from './shorten.out';

const request: ShortenInput = {
  awinaffid: '556',
  awinmid: '73',
  endpoint: 'https://accident.snowdon.dev',
};

describe('Shorten interactor', () => {
  let interactor: ShortenInteractor;
  let shortenRepository: any;
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
      try {
        await interactor.execute(request);
        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toBe('shorten');
      }
    })
  });

  describe('will handle generation of duplicate GUID', () => {
    beforeEach(() => {
      shortenRepository = {
        storeShortLink: jest.fn(async () => 1),
        ensureUniqueGUID: jest.fn()
          .mockImplementationOnce(async () => false)
          .mockImplementationOnce(async () => false)
          .mockImplementationOnce(async () => true),
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
      const response = await interactor.execute(request);
      expect(shortenRepository.ensureUniqueGUID).toHaveBeenCalledTimes(3);
      expect(typeof response.url).toBe('string');
    });
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
      const response = await interactor.execute(request);
      const parts = response.url.split('/');
      expect(parts[0]).toBe('localhost:3000');
      expect(parts[1]).toMatch(/[a-zA-Z0-9]{4}/);
    });
  })
});
