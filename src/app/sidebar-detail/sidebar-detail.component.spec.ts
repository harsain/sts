import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SidebarDetailComponent } from './sidebar-detail.component';
import { CategoryService } from '../category.service';


describe('SidebarDetailComponent', () => {
  let component: SidebarDetailComponent;
  let fixture: ComponentFixture<SidebarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDetailComponent);
    component = fixture.componentInstance;
    component.allCategories = new CategoryService().getCategories();
    component.showXAxis = true;
    component.showYAxis = true;
    component.gradient = false;
    component.showLegend = true;
    component.showXAxisLabel = true;
    component.xAxisLabel = 'Category';
    component.showYAxisLabel = true;
    component.yAxisLabel = 'Count';
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
