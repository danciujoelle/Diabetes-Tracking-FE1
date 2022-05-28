import { TestBed } from '@angular/core/testing';

import { SportLogService } from './sport-log.service';

describe('SportLogService', () => {
  let service: SportLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
