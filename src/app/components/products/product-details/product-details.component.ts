import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {Product} from '../models/Product';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../../core/services/products.service';
import {CartProduct} from '../../cart/models/cart-product.model';
import {CartService} from '../../../core/services/cart.service';
import {MessageActions} from '../../../core/message.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {} as Product;
  currentImage: string;
  otherProducts: Product[];
  id: string;
  quantity: number = 1;
  displaySpinner: boolean = true;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private service: ProductsService,
              private cartService: CartService,
              private message: MessageActions) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap['params']['id'];
      this.service.renderProducts().subscribe(products => {
        let product = products.filter(p => p._id === this.id)[0];
        this.currentImage = product.images[0];
        this.product = product;
        this.otherProducts = products.filter(p => p._id !== this.id).slice(0 , 4);
        this.displaySpinner = false;
      });
    });
  }

  imageClicked(image){
    this.currentImage = image;
  }

  incrementQty(){
    if(this.quantity !== 10){
      this.quantity += 1;
    }

  }

  decrementQty(){
    if(this.quantity !== 0){
      this.quantity -= 1;
    }
  }

  addToCart(e){
    e.preventDefault();

    let productForCart = new CartProduct(
      this.product._id,
      this.product.name,
      this.product.image,
      this.product.price,
      this.quantity
    );

    if(this.product.discount !== undefined){
      productForCart.price = this.product.discount;
    }

    this.cartService.addProduct(productForCart);
    this.message.success('Product added to cart!');
  }

}


