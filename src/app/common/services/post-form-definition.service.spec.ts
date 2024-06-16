import { TestBed } from '@angular/core/testing';

import { PostFormDefinitionService } from './post-form-definition.service';

describe('PostFormDefinitionService', () => {
  let service: PostFormDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFormDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
