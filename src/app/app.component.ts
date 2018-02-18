import { Component, OnChanges, SimpleChanges, Output, EventEmitter, SimpleChange, OnInit } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  selectedCategory: Category;
  allCategories: Category[];

  @Output() updateSelectedCategory = new EventEmitter<Category>();

  ngOnChanges(changes: SimpleChanges) {
    const category: SimpleChange = changes.selectedCategory;
    console.log('prev value: ', category.previousValue);
    console.log('got name: ', category.currentValue);
    this.updateSelectedCategory.emit(this.selectedCategory);
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if (!this.selectedCategory) {
      this.getCategories();
    }
  }

  getCategories(): void {
    this.allCategories = this.categoryService.getCategories();
  }

}
