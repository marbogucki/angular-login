import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoriesService} from '../categories.service';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss']
})
export class CategoriesAddComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: ''
    });
  }

  addCategory() {
    this.categoriesService.addCategory(this.categoryForm.value)
      .subscribe(() => this.router.navigate(['/categories']));
  }
}
