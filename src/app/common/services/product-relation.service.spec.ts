import { TestBed } from '@angular/core/testing';

import { ProductRelationService } from './product-relation.service';

describe('ProductRelationService', () => {
  let service: ProductRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
