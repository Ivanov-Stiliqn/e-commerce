import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductsService} from '../../core/services/products.service';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsBannerComponent } from './products-banner/products-banner.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAddComponent } from './product-add/product-add.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {SharedModule} from '../shared/shared.module';
import {ProductsRoutingModule} from './products-routing.module';
import {TokenInterceptor} from '../../core/interceptors/token.interceptor';
import {RadarSpinnerModule} from 'angular-epic-spinners';
import {CartService} from '../../core/services/cart.service';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {CustomFormsModule} from 'ng2-validation';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProductsSearchComponent} from './products-search/products-search.component';
import {AdminGuard} from '../../core/guards/admin.guard';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsBannerComponent,
    ProductDetailsComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductsSearchComponent,
    ProductsListComponent,
    ProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    Ng2CloudinaryModule,
    SharedModule,
    RadarSpinnerModule,
    CustomFormsModule,
    NgxPaginationModule],
  exports: [ProductComponent],
  providers: [ProductsService, CartService, AdminGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class ProductsModule {}
