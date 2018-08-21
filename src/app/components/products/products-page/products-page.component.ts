import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../models/Product';
import {AppState} from '../../../store/state/app.state';
import {ProductsService} from '../../../core/services/products.service';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {Category} from '../../categories/models/Category';


@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;
  category: Category;
  id: string;
  displaySpinner: boolean = true;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private productsService: ProductsService
              ) {}

  ngOnInit() {
   this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap['params']['id'];

      this.store.pipe(select(state => state.categories.all)).subscribe(categories => {
        if(categories.length > 0){
          this.category = categories.filter(c => c._id === this.id)[0];

          this.displaySpinner = false;
        }
      });

     this.products$ = this.productsService.renderProductsByCategory(this.id);
   });
  }
}
