import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../categories.service";
import {Category} from "../category.type";

@Component({
  selector: 'app-users-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories: Category[];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe(
        (categories: Category[]) => this.categories = categories
      );
  }

  removeCategory(category: Category) {
    this.categoriesService.removeCategory(category)
      .subscribe(() => {
        this.categories = this.categories.filter(item => item.id !== category.id);
      });
  }
}
