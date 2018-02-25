import { Component, OnChanges, SimpleChanges, Output, EventEmitter, SimpleChange, OnInit, HostListener } from '@angular/core';
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
  showMenu:boolean;

  @Output() updateSelectedCategory = new EventEmitter<Category>();

  ngOnChanges(changes: SimpleChanges) {
    const category: SimpleChange = changes.selectedCategory;
    this.updateSelectedCategory.emit(this.selectedCategory);
  }

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    if (!this.selectedCategory) {
      this.getCategories();
    }
    if (window.screen.width > 786) {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth  > 786) {
      this.showMenu = false;
    }
  }
  updateShowMenu(): void {
    this.showMenu = !this.showMenu;
  }

  getCategories(): void {
    this.allCategories = this.categoryService.getCategories();
  }

}
