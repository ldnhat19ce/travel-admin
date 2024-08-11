import { TestBed } from '@angular/core/testing';

import { ProductAmtService } from './product-amt.service';

describe('ProductAmtService', () => {
  let service: ProductAmtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAmtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
