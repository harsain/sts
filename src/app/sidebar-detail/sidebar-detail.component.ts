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
  styleUrls: ['./sidebar-detail.component.css'],
})
export class SidebarDetailComponent implements OnInit, OnChanges {

  @Input() selectedCategory: any;
  @Input() allCategories: Category[];

  categoryData: CategoryData[];
  headers: string[] = [];
  groupedAllCategoriesData: GroupBarData[];
  groupedFaceValuesOfAllCategories: GroupBarData[];
  selectedCategoryData: GroupBarData[];
  allCategoriesTableData: AllCategoryData[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Category';
  showYAxisLabel = true;
  yAxisLabel = 'Count';

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.groupedAllCategoriesData = this.getAllCategoriesSeriesData().pns;
    this.groupedFaceValuesOfAllCategories = this.getAllCategoriesSeriesData().faceValues;
    if (this.selectedCategory === null) {
      this.resetTableHeadersForAllCategories();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const category: SimpleChange = changes.selectedCategory;

    if (this.selectedCategory && this.selectedCategory != 'All') {
      this.headers = [];
      this.headers.push('year');
      this.headers.push('pns');
      this.headers.push('faceValues');
      this.getCategoriesData(this.selectedCategory.name);
      this.selectedCategoryData = this.getGroupedDataForCategory(this.selectedCategory);
    } else {
      this.resetTableHeadersForAllCategories();
      this.selectedCategory = null;
    }
  }

  getGroupedDataForCategory(category: Category): GroupBarData[] {
    let categoryData: GroupBarData[] = [];
    this.getAllCategoriesSeriesData().pns.forEach(elem => {
      if (elem.name === category.name) {
        elem.series.forEach( pnsData => {
          categoryData.push( new GroupBarData(pnsData.name, [new Series('pns', pnsData.value)] ) );
        });
      }
    });
    this.getAllCategoriesSeriesData().faceValues.forEach(elem => {
      if (elem.name === category.name) {
        elem.series.forEach( faceValueData => {
          categoryData.forEach( yearData => {
            if (yearData.name === faceValueData.name) {
              yearData.series.push(new Series('faceValues', faceValueData.value));
            }
          });
        });
      }
    });

    return categoryData;
  }

  getAllCategoriesSeriesData(): AllCategoryDataByOffence {
    this.allCategoriesTableData = [];
    let categoriesByOffence: any;
    let groupedCatDataArr: GroupBarData[] = [];
    let faceValuesGroupedCatDataArr: GroupBarData[] = [];
    const categoriesData: any = this.categoryService.getCategoryData();
    for (let key in categoriesData) {
      if (categoriesData.hasOwnProperty(key)) {
        const pnsSeriesArr: Series[] = [];
        const faceValuesSeriesArr: Series[] = [];
        categoriesData[key].forEach(element => {
          pnsSeriesArr.push(new Series(element['year'], element['pns']));
          faceValuesSeriesArr.push(new Series(element['year'], element['faceValues']));

          this.allCategoriesTableData.push( new AllCategoryData(key, element['year'], element['pns'], element['faceValues']));
        });

        groupedCatDataArr.push(new GroupBarData(key, pnsSeriesArr));
        faceValuesGroupedCatDataArr.push(new GroupBarData(key, faceValuesSeriesArr));
        categoriesByOffence = <AllCategoryDataByOffence> {
          pns: groupedCatDataArr,
          faceValues: faceValuesGroupedCatDataArr
        };
      }
    }

    return categoriesByOffence;
  }

  getCategoriesData(category: string): void {
    this.categoryData = this.categoryService.getCategoryData()[category];
  }

  resetTableHeadersForAllCategories() {
    this.headers = [];
    this.headers.push('category');
    this.headers.push('year');
    this.headers.push('pns');
    this.headers.push('faceValues');
  }
}

export interface AllCategoryDataByOffence {
  pns: GroupBarData[];
  faceValues: GroupBarData[];
}

export class AllCategoryData {
  category: string;
  year: number;
  pns: number;
  faceValues: number;

  constructor(category: string, year: number, pns: number, faceValues: number) {
    this.category = category;
    this.year = year;
    this.pns = pns;
    this.faceValues = faceValues;
  }
}