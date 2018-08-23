import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../../../store/state/app.state';
import {MessageActions} from '../../../core/message.actions';
import {ProductsService} from '../../../core/services/products.service';
import {Category} from '../../categories/models/Category';
import {ProductAddModel} from '../models/product-add.model';
import {ActivatedRoute, Router} from '@angular/router';
import {validateProduct} from '../../../core/utilities/validator';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['../../shared/forms.css', './product-edit.component.css']

})
export class ProductEditComponent implements OnInit {
  files: File[] = [];
  id: string;
  displaySpinner: boolean = true;
  categories: Observable<Category[]>;
  product = new ProductAddModel('','','',[], '', '', null, null, null);

  constructor(private service: ProductsService,
              private store: Store<AppState>,
              private router: Router,
              private message: MessageActions,
              private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap['params']['id'];
      this.categories = this.store.pipe(select(state => state.categories.all));
      this.service.getProductById(this.id).subscribe(data => {
        this.product = data;
        this.displaySpinner = false;
      });
    });

  }

  fileUploaded(event) {
    this.files = event.target.files;
  }

  onSubmit() {
    let check = validateProduct(this.product.category, this.product.name, this.product.description, this.product.details, this.product.price, this.product.quantity, this.product.discount);
    if(check !== '') {
      this.message.error(check);
      return;
    }

    this.message.warning('Loading....');
    if(this.files.length > 0){
      this.service.uploadImages(this.files).subscribe(data => {
        data.forEach(o => this.product.images.push(o.url));
        this.product.image = this.product.images[0];

        this.service.editProduct(this.id, this.product).subscribe(editedProduct => {
          if(editedProduct){
            this.router.navigateByUrl(`/products/category/${this.product.category}`);
            this.message.success('Product edited !');
          }
        })
      });
    }
    else{
      this.service.editProduct(this.id, this.product).subscribe(editedProduct => {
        if(editedProduct){
          this.router.navigateByUrl(`/products/category/${this.product.category}`);
          this.message.success('Product edited !');
        }
      })
    }
  }
}
