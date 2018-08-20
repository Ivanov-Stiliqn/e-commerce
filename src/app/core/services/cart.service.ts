import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppState} from '../../store/state/app.state';
import {Store} from '@ngrx/store';
import {CartProduct} from '../../components/cart/models/cart-product.model';
import {AddProduct, ClearCart, RemoveProduct, RenderProducts} from '../../store/actions/cart.actions';
import {Observable} from 'rxjs';

@Injectable()
export class CartService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  addProduct(product: CartProduct) {
    let checkCart = localStorage.getItem('cart');
    let cart;

    if(checkCart !== null){
      cart = JSON.parse(checkCart);
    }
    else{
      cart = [];
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.store.dispatch(new AddProduct(product));
  }

  renderProducts(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null){
      cart = [];
    }

    this.store.dispatch(new RenderProducts(cart));

    return Observable.create((observer) => {
      observer.next();
    })
  }

  removeProduct(id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newCart = cart.filter(p => p._id !== id);
    localStorage.setItem('cart', JSON.stringify(newCart));

    this.store.dispatch(new RemoveProduct(id));

    return Observable.create((observer) => {
      observer.next();
    })
  }

  clearCart(){
    localStorage.removeItem('cart');
    this.store.dispatch(new ClearCart());

    return Observable.create((observer) => {
      observer.next();
    })
  }
}
