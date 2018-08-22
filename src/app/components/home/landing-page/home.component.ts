import {Component, OnInit} from '@angular/core';
import {Product} from '../../products/models/Product';
import {ProductsService} from '../../../core/services/products.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  products: Observable<Product[]>;
  displaySpinner = true;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.renderProducts().subscribe((data) => {
      this.products = data.slice(0, 8);
      this.displaySpinner = false;
    });
  }
}
