import { TestBed } from '@angular/core/testing';

import { PortfolioCollectionService } from './portfolio-collection.service';

describe('PortfolioCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortfolioCollectionService = TestBed.get(PortfolioCollectionService);
    expect(service).toBeTruthy();
  });
});
