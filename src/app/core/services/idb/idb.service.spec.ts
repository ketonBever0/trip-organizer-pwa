/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IdbService } from './idb.service';

describe('Service: Idb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdbService]
    });
  });

  it('should ...', inject([IdbService], (service: IdbService) => {
    expect(service).toBeTruthy();
  }));
});
