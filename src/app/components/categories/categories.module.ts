import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CategoriesService} from '../../core/services/categories.service';
import { CategoryAddComponent } from './category-add/category-add.component';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {SharedModule} from '../shared/shared.module';
import {CategoriesRoutingModule} from './categories-routing.module';
import {TokenInterceptor} from '../../core/interceptors/token.interceptor';

@NgModule({
  declarations: [CategoryAddComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    Ng2CloudinaryModule,
    SharedModule],
  exports: [],
  providers: [CategoriesService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }]
})
export class CategoriesModule {}
