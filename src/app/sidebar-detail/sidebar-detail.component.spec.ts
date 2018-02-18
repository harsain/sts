import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDetailComponent } from './sidebar-detail.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
