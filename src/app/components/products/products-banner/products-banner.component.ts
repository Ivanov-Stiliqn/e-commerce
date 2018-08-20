import {Component, Input} from '@angular/core';

@Component({
  selector: 'products-banner',
  templateUrl: './products-banner.component.html',
  styleUrls: ['./products-banner.component.css']
})
export class ProductsBannerComponent {
  @Input() image;
  @Input() name;
}
