import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  template: `
    <h1>Products Page</h1>
    <p>This module was LAZY LOADED!</p>

    <ul>
      <li>Product 1 - Laptop</li>
      <li>Product 2 - Phone</li>
      <li>Product 3 - Tablet</li>
    </ul>
  `
})

export class ProductsComponent { }