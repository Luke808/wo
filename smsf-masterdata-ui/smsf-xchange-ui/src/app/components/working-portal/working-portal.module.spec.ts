import { WorkingPortalModule } from './working-portal.module';

describe('WorkingPortalModule', () => {
  let workingPortalModule: WorkingPortalModule;

  beforeEach(() => {
    workingPortalModule = new WorkingPortalModule();
  });

  it('should create an instance', () => {
    expect(workingPortalModule).toBeTruthy();
  });
});
