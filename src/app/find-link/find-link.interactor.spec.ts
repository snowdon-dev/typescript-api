import { FindLinkInteractor } from './find-link.interactor';
import { FindLinkInput } from './find-link.in';

import { TestEnvironment } from '../../test-environment';

describe('FindLink interactor', () => {
  let interactor: FindLinkInteractor;
  let findLinkRepository;
  let findLinkValidator;
  let errorFactory;

  describe('unknown uid', () => {
    beforeEach(() => {
      findLinkRepository = {
        findLinkByUid: jest.fn(async () => null),
      };
      findLinkValidator = {
        validate: jest.fn(() => {
          return {
            valid: true,
            error: null,
          };
        }),
      };
      errorFactory = {
        getError: jest.fn(() => new Error('find-link')),
      };
      interactor = TestEnvironment.createInstance(FindLinkInteractor, [
        {
          name: 'findLinkRepository',
          useValue: findLinkRepository,
        },
        {
          name: 'findLinkValidator',
          useValue: findLinkValidator,
        },
        {
          name: 'errorFactory',
          useValue: errorFactory,
        },
      ]);
    });
    it('returns an error', async () => {
      const request: FindLinkInput = {
        uid: 'sdf4',
      };
      const response = await interactor.execute(request);
      expect(response.error).toBe(true);
    });
  });
  describe('known uid', () => {
    beforeEach(() => {
      findLinkRepository = {
        findLinkByUid: jest.fn(async () => {
          return {
            endpoint: 'https://accident.snowdon.dev',
          };
        }),
      };
      findLinkValidator = {
        validate: jest.fn(() => {
          return {
            valid: true,
            error: null,
          };
        }),
      };
      errorFactory = {
        getError: jest.fn(() => new Error('find-link')),
      };
      interactor = TestEnvironment.createInstance(FindLinkInteractor, [
        {
          name: 'findLinkRepository',
          useValue: findLinkRepository,
        },
        {
          name: 'findLinkValidator',
          useValue: findLinkValidator,
        },
        {
          name: 'errorFactory',
          useValue: errorFactory,
        },
      ]);
    });
    it('works', async () => {
      const request: FindLinkInput = {
        uid: 'aaaa',
      };
      const response = await interactor.execute(request);
      expect(response.url).toBe('https://accident.snowdon.dev');
    });
  });
});
