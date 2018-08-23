import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {Product} from '../models/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../core/services/products.service';
import {CartProduct} from '../../cart/models/cart-product.model';
import {CartService} from '../../../core/services/cart.service';
import {MessageActions} from '../../../core/message.actions';
import {map} from 'rxjs/internal/operators';
import {User} from '../../users/models/User';
import {validateReview} from '../../../core/utilities/validator';

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
  user: User;
  descriptionClicked: boolean = true;
  reviewText: string = '';

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private service: ProductsService,
              private cartService: CartService,
              private message: MessageActions,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap['params']['id'];
      this.service.renderProducts().subscribe(products => {
        let product = products.filter(p => p._id === this.id)[0];
        this.currentImage = product.images[0];
        this.product = product;
        this.otherProducts = products.filter(p => p._id !== this.id && p.category === this.product.category).slice(0 , 4);
        this.displaySpinner = false;
      });
    });

    this.store.pipe(map(state => state.auth.current)).subscribe(user => {
      this.user = user;
    })
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

    if(this.user.username === undefined) {
       this.router.navigateByUrl('/login');
       this.message.error('Login first, please !');
       return;
    }

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
    this.message.success(`Product ${this.product.name} added to cart!`);
  }

  deleteProduct() {
    this.service.deleteProduct(this.product).subscribe(res => {
      if(res) {
        this.router.navigateByUrl(`/products/category/${this.product.category}`);
        this.message.success(`Product ${this.product.name} deleted !`);
      }

    });
  }

  changeParams(){
    this.descriptionClicked = !this.descriptionClicked;
  }

  addReview(){
    let check = validateReview(this.reviewText);
    if(check !== ''){
      this.message.error(check);
      return;
    }

    let review = {
      username: this.user.username,
      comment: this.reviewText
    };

    if(this.product.reviews === undefined){
      this.product.reviews = [];
    }
    this.product.reviews.push(review);
    this.service.addReview(this.product).subscribe(() => {
      this.message.success('Review added !');
    });
  }
}


