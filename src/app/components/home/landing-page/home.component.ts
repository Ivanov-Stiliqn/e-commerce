import {Component} from '@angular/core';
import {Product} from '../../products/models/Product';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {ProductsService} from '../../../core/services/products.service';
import {Observable} from 'rxjs';
import * as ProductsActions from '../../../store/actions/products.actions';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  products: Observable<Product[]>;
  displaySpinner = true;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.renderProducts().subscribe((data) => {
      this.products = data;
      this.displaySpinner = false;
    });
  }
}
