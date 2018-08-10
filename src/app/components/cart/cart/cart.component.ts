import { Component, OnInit } from '@angular/core';
import {CartService} from '../../../core/services/cart.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {Observable} from 'rxjs';
import {CartProduct} from '../models/cart-product.model';
import {map} from 'rxjs/internal/operators';
import {MessageActions} from '../../../core/message.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Observable<CartProduct[]>;
  total: number;
  cartUpdate: boolean = false;

  constructor(private service: CartService, private store: Store<AppState>, private message: MessageActions) { }

  ngOnInit() {
    this.service.renderProducts().subscribe(() => {
      this.products = this.store.pipe(map(state => state.cart.products));
      this.store.pipe(map(state => state.cart.total)).subscribe(total => {
        this.total = total;
      });
    })
  }


  updateCart() {
    this.cartUpdate = !this.cartUpdate;
  }

  clearCart(){
    this.service.clearCart().subscribe(() => {
      this.message.success('Cart cleared !');
    });
  }

  removeProduct(id, name){
    this.service.removeProduct(id).subscribe(() => {
      this.message.success(`Product: ${name} removed from cart`);
    })
  }
}
