import { TestBed, inject } from '@angular/core/testing';

import { ToolboxGroupService } from './toolbox-group.service';

describe('ToolboxGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolboxGroupService]
    });
  });

  it('should be created', inject([ToolboxGroupService], (service: ToolboxGroupService) => {
    expect(service).toBeTruthy();
  }));
});
