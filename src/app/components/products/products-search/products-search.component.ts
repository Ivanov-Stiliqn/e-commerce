import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../../core/services/products.service';
import {Product} from '../models/Product';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageActions} from '../../../core/message.actions';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css'],
  animations: [
    trigger('listProducts', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),])]
})
export class ProductsSearchComponent implements OnInit {
  products: Product[];
  search: string;
  displaySpinner: boolean = true;
  currentPage = 1;
  pageSize = 4;

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private message: MessageActions,
              private router: Router

  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.search = paramMap['params']['search'];
      this.productsService.getProductByName(this.search).subscribe(data => {
        if(data.length > 0){
          this.products = data;
        }
        else{
          this.router.navigateByUrl('/');
          this.message.warning('No products matched your search !');
        }

        this.displaySpinner = false;
      });
    });

  }

}
