/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlatillosService } from './platillos.service';

describe('Service: Platillos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlatillosService]
    });
  });

  it('should ...', inject([PlatillosService], (service: PlatillosService) => {
    expect(service).toBeTruthy();
  }));
});
