import {Component, OnInit} from '@angular/core';
import {Product} from '../../products/models/Product';
import {ProductsService} from '../../../core/services/products.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/state/app.state';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  products: Product[];
  displaySpinner: boolean = true;

  constructor(private productsService: ProductsService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
   this.store.pipe(map(state => state.products.currencyChanged)).subscribe((isChanged) => {
     if(isChanged){
       this.displaySpinner = true;

       setTimeout(() => {
         this.displaySpinner = false;
       }, 500);
     }
   });

    this.productsService.renderProducts().subscribe((data) => {
      this.products = data.slice(0, 8);
      this.displaySpinner = false;
    });
  }
}
