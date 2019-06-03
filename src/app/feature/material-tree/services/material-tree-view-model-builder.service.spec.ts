import { TestBed } from '@angular/core/testing';

import { MaterialTreeViewModelBuilderService } from './material-tree-view-model-builder.service';

describe('MaterialTreeViewModelBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialTreeViewModelBuilderService = TestBed.get(MaterialTreeViewModelBuilderService);
    expect(service).toBeTruthy();
  });
});
