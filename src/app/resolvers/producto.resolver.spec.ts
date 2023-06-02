import { TestBed } from '@angular/core/testing';

import { ProductoResolver } from './producto.resolver';

describe('ProductoResolver', () => {
  let resolver: ProductoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
