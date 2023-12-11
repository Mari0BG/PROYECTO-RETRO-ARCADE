import { TestBed } from '@angular/core/testing';

import { AdminControlService } from './admin-control.service';

describe('AdminControlService', () => {
  let service: AdminControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
