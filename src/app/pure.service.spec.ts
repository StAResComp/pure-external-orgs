import { TestBed } from '@angular/core/testing';

import { PureService } from './pure.service';

describe('PureService', () => {
  let service: PureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
