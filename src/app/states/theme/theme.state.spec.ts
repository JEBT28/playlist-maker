import { TestBed } from '@angular/core/testing';

import { ThemeState } from './theme.state';

describe('ThemeService', () => {
  let service: ThemeState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
