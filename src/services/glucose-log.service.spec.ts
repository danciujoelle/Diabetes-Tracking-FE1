import { TestBed } from '@angular/core/testing';

import { GlucoseLogService } from './glucose-log.service';

describe('GlucoseLogService', () => {
  let service: GlucoseLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlucoseLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
