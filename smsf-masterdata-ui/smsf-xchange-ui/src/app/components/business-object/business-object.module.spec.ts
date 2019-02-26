import { BusinessObjectModule } from './business-object.module';

describe('BusinessObjectModule', () => {
  let businessObjectModule: BusinessObjectModule;

  beforeEach(() => {
    businessObjectModule = new BusinessObjectModule();
  });

  it('should create an instance', () => {
    expect(businessObjectModule).toBeTruthy();
  });
});
