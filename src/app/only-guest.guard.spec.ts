import { TestBed } from '@angular/core/testing';

import { OnlyGuestGuard } from './only-guest.guard';

describe('OnlyGuestGuard', () => {
  let guard: OnlyGuestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyGuestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
