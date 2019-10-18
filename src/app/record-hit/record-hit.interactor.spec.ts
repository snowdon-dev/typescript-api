import { RecordHitInteractor } from './record-hit.interactor';
import { TestEnvironment } from '../../test-environment';
import { RecordHitInput } from './record-hit.in';

describe('RecordHit interactor', () => {
  let interactor: RecordHitInteractor;
  let recordHitRepository;
  let recordHitValidator;
  let errorFactory;

  describe('execute create a record', () => {
    beforeEach(() => {
      recordHitRepository = {
        recordHit: jest.fn(async () => true),
      };
      recordHitValidator = {
        validate: jest.fn(() => {
          return {
            valid: true,
            error: false,
          };
        }),
      };
      errorFactory = {
        getError: jest.fn(() => new Error('RecordHit')),
      };
      interactor = TestEnvironment.createInstance(RecordHitInteractor, [
        {
          name: 'recordHitRepository',
          useValue: recordHitRepository,
        },
        {
          name: 'recordHitValidator',
          useValue: recordHitValidator,
        },
        {
          name: 'errorFactory',
          useValue: errorFactory,
        },
      ]) as RecordHitInteractor;
    });
    it('works', async () => {
      const request: RecordHitInput = {
        uid: 'aaaa',
      };
      const response = await interactor.execute(request);
      expect(response.error).toBe(false);
    });
  });
});
