import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { CategoryService } from './category.service';
import { SortService } from './sort.service';
import { SidebarDetailComponent } from './sidebar-detail/sidebar-detail.component';
import { TableComponent } from './table/table.component';
import { SortableColumnComponent } from './sortable-column/sortable-column.component';
import { SortableTableDirective } from './sortable-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarDetailComponent,
    TableComponent,
    SortableColumnComponent,
    SortableTableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [ CategoryService, SortService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
