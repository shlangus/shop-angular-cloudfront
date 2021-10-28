import { TestBed } from '@angular/core/testing';

import { CartMediatorService } from './cart-mediator.service';

describe('CartMediatorService', () => {
  let service: CartMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
