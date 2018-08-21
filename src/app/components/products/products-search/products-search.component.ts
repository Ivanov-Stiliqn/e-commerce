import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../core/services/products.service';
import {Product} from '../models/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css']
})
export class ProductsSearchComponent implements OnInit {
  products$: Observable<Product[]>;
  search: string;
  displaySpinner: boolean = true;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private message: MessageActions,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.search = paramMap['params']['search'];
      this.products$ = this.productsService.getProductByName(this.search);
      this.displaySpinner = false;

      this.products$.subscribe(data => {
        if(data.length === 0) {
          this.message.warning('No products matched your search !');
          this.router.navigateByUrl('/');
        }
      });
    });
  }
}
