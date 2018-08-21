import {Component, Input } from '@angular/core';
import {productsAnimations} from '../../shared/app.animations';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  animations: productsAnimations
})
export class ProductsListComponent {
  @Input() products$;
  currentPage = 1;
  pageSize = 8;

  controlsClicked() {
    window.scrollTo(300, 300);
  }
}
