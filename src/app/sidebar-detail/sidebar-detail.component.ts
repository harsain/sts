import { Component, OnInit, Input, SimpleChanges, SimpleChange, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Category } from '../category';
import { CategoryData } from '../category-data';
import { CategoryService } from '../category.service';
import { GroupBarData } from '../group-bar-data';
import { Series } from '../series';

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
  groupedAllCategoriesData: GroupBarData[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if (this.selectedCategory) {
      this.getCategoriesData(this.selectedCategory.name);
    }
    this.getAllCategoriesSeriesData();
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

  getAllCategoriesSeriesData() {
    // console.debug(this.categoryService.getCategoryData());
    let categoriesData: any = this.categoryService.getCategoryData();
    for (const category in categoriesData) {
      const seriesArr: Series[] = [];
      categoriesData[category].forEach(element => {
        seriesArr.push(new Series(element['year'], element['pns']));
      });

      const groupedCatData: GroupBarData = new GroupBarData(category, seriesArr);
      console.log(groupedCatData);
    }
  }

  getCategoriesData(category: string): void {
    console.table(this.categoryService.getCategoryData());
    this.categoryData = this.categoryService.getCategoryData()[category];
  }
}
