import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductsService} from '../../../core/services/products.service';
import {ProductAddModel} from '../models/product-add.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {Category} from '../../categories/models/Category';
import {Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {validateProduct} from '../../../core/utilities/validator';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['../../shared/forms.css']
})
export class ProductAddComponent implements OnInit {
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
    if(this.files.length === 0){
      this.message.warning('Please add at least one image !');
      return;
    }

    let check = validateProduct(this.product.category, this.product.name, this.product.description, this.product.details, this.product.price, this.product.quantity);
    if(check !== '') {
      this.message.error(check);
      return;
    }

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
