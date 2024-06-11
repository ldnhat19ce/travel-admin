import { TestBed } from '@angular/core/testing';

import { PostFormResultService } from './post-form-result.service';

describe('PostFormResultService', () => {
  let service: PostFormResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFormResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
