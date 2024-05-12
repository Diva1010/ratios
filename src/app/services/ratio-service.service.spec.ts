import { TestBed } from '@angular/core/testing';

import { RatioServiceService } from './ratio-service.service';

describe('RatioServiceService', () => {
  let service: RatioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
