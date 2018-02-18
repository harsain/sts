import { Component, OnInit, Input, SimpleChanges, SimpleChange, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Category } from '../category';
import { CategoryData } from '../category-data';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-sidebar-detail',
  templateUrl: './sidebar-detail.component.html',
  styleUrls: ['./sidebar-detail.component.css']
})
export class SidebarDetailComponent implements OnInit, OnChanges {

  @Input() selectedCategory: Category;
  @Input() allCategories: Category[];

  categoryData: CategoryData[];
  headers: string[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if (this.selectedCategory) {
      this.getCategoriesData(this.selectedCategory.name);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const category: SimpleChange = changes.selectedCategory;
    console.log('prev value: ', category.previousValue);
    console.log('got name: ', category.currentValue);
    if (this.selectedCategory) {
      this.headers = [];
      this.headers.push('Year');
      this.headers.push('Number of PNs');
      this.headers.push('Face Values');
      this.getCategoriesData(this.selectedCategory.name);
    }
  }

  getCategoriesData(category: string): void {
    console.table(this.categoryService.getCategoryData());
    this.categoryData = this.categoryService.getCategoryData()[category];
  }
}
