import { Component, Input } from '@angular/core';

@Component({
  selector: 'single-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product;
}
