import { TestBed } from '@angular/core/testing';

import { SubirIMGService } from './subir-img.service';

describe('SubirIMGService', () => {
  let service: SubirIMGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirIMGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
