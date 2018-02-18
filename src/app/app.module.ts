import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { CategoryService } from './category.service';
import { SidebarDetailComponent } from './sidebar-detail/sidebar-detail.component';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    SidebarComponent,
    SidebarDetailComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ CategoryService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
