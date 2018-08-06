import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutesModule} from '../../core/routes.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductsService} from '../../core/services/products.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RoutesModule, FormsModule, HttpClientModule],
  exports: [],
  providers: [ProductsService]
})
export class ProductsModule {}
