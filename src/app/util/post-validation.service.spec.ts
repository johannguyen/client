import { TestBed } from '@angular/core/testing';

import { PostValidationService } from './post-validation.service';

describe('PostValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostValidationService = TestBed.get(PostValidationService);
    expect(service).toBeTruthy();
  });
});
