import { TestBed } from '@angular/core/testing';

import { MainService } from './modules/main/services/main.service';

describe('AppService', () => {
  let service: MainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
