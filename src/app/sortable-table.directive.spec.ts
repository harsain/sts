import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableTableDirective } from './sortable-table.directive';
import { SortService } from './sort.service';

describe('SortableTableDirective', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SortService }
      ]
    }).compileComponents();
  }));

  it('should create an instance', () => {
    const service: SortService = new SortService();
    const directive = new SortableTableDirective(service);
    expect(directive).toBeTruthy();
  });
});
