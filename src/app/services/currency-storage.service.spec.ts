import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { CurrencyStorageService } from './currency-storage.service';

describe('CurrencyStorageService', () => {
  let service: CurrencyStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
