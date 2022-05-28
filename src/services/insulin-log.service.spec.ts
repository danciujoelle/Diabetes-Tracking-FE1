import { TestBed } from '@angular/core/testing';

import { InsulinLogService } from './insulin-log.service';

describe('InsulinLogService', () => {
  let service: InsulinLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsulinLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
