import { TestBed } from '@angular/core/testing';

import { WorkingPortalService } from './working-portal.service';

describe('WorkingPortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkingPortalService = TestBed.get(WorkingPortalService);
    expect(service).toBeTruthy();
  });
});
