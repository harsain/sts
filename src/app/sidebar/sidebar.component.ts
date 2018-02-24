import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {

  categories: Category[];
  @Input() selectedCategory: any;
  @Output() updateSelectedCategory = new EventEmitter<any>();

  onSelect(category: Category): void {
    this.selectedCategory = category;
    this.updateSelectedCategory.emit(this.selectedCategory);
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if (!this.selectedCategory) {
      this.selectedCategory = 'All';
    }
    this.getCategories();
  }

  getCategories(): void {
    this.categories = this.categoryService.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    const category: SimpleChange = changes.selectedCategory;
    this.selectedCategory = category.currentValue;
    this.updateSelectedCategory.emit(this.selectedCategory);
  }
}
