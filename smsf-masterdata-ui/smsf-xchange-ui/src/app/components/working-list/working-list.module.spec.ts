import { WorkingListModule } from './working-list.module';

describe('WorkingListModule', () => {
  let workingListModule: WorkingListModule;

  beforeEach(() => {
    workingListModule = new WorkingListModule();
  });

  it('should create an instance', () => {
    expect(workingListModule).toBeTruthy();
  });
});
