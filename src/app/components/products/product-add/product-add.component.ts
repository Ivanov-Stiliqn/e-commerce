import {Component} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {ProductsService} from '../../../core/services/products.service';
import {ProductAddModel} from '../models/product-add.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {Category} from '../../categories/models/Category';
import {AddProduct} from '../../../store/actions/products.actions';
import {Product} from '../models/Product';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['../../shared/forms.css']
})
export class ProductAddComponent {
  files: File[] = [];
  categories: Observable<Category[]>;
  product = new ProductAddModel('','','',[], '', '', null, null);

  constructor(private service: ProductsService, private store: Store<AppState>, private router: Router, private message: MessageActions) {
  }

  ngOnInit(){
    this.categories = this.store.pipe(select(state => state.categories.all));
  }

  fileUploaded(event) {
    this.files = event.target.files;
  }

  onSubmit() {
    this.message.warning('Loading....');
    this.service.uploadImages(this.files).subscribe(data => {
      data.forEach(o => this.product.images.push(o.url));
      this.product.image = this.product.images[0];

      this.service.addProduct(this.product).subscribe(newProduct => {
        if(newProduct){
          this.router.navigateByUrl(`/products/category/${this.product.category}`);
          this.message.success('Product added !');
        }
      })
    });
  }
}
