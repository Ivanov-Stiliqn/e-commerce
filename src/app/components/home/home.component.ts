import {Component} from '@angular/core';
import {Product} from '../products/models/Product';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {ProductsService} from '../../core/services/products.service';
import {Observable} from 'rxjs';
import * as ProductsActions from '../../store/actions/products.actions';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  products: Observable<Product[]>;
  displaySpinner = true;

  constructor(private store: Store<AppState>,
              private productsService: ProductsService) {}

  ngOnInit() {
    this.products = this.store.select('products');
    this.productsService.renderProducts().subscribe(products => {
      if(products){
        this.store.dispatch(new ProductsActions.RenderProducts(products as Product[]));
        this.displaySpinner = false
      }
    });
  }
}
