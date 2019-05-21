import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formProducts: FormGroup = this.fb.group({
    name: 'test',
    products: []
  });

  products: Event[] = [];
  events: Event[];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.events = [
      { id: 1, name: 'Toggle this custom checkbox' },
      { id: 2, name: 'Or toggle this other custom checkbox' },
      { id: 3, name: 'Check this custom checkbox '}
    ];
  }

  AddProducts() {
    console.log(this.formProducts.value);
  }

  addProduct(event: Event) {
    this.products = [...this.products, event];
    console.log(this.products);
    this.formProducts.patchValue({
      products: this.products
    });
  }

}

export interface Event {
  id: number;
  name: string;
}
