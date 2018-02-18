import { Injectable } from '@angular/core';

import { Category } from './category';
import { CATEGORIES } from './mock-categories';
import { CATEGORIESDATA } from './mock-category-data';

@Injectable()
export class CategoryService {

  constructor() { }

  getCategories(): Category[] {
    return CATEGORIES;
  }

  getCategoryData(): any {
    return CATEGORIESDATA;
  }
}
