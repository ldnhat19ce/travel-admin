import { TestBed } from '@angular/core/testing';

import { ProductZoneService } from './product-zone.service';

describe('ProductZoneService', () => {
  let service: ProductZoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductZoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
