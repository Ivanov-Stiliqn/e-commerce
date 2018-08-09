import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RoutesModule} from './core/routes.module';
import {UsersModule} from './components/users/users.module';
import {HomeComponent} from './components/home/landing-page/home.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './components/shared/shared.module';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MessageActions} from './core/message.actions';
import {ProductsModule} from './components/products/products.module';
import {CategoriesModule} from './components/categories/categories.module';
import {RadarSpinnerModule} from 'angular-epic-spinners';
import {AppStoreModule} from './store/store.module';
import {SliderComponent} from './components/home/slider/slider.component';
import {TokenInterceptor} from './core/interceptors/token.interceptor';
import {CanActivateRouteGuard} from './core/guards/auth.guard';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import { UpperAdsComponent } from './components/home/static/upper-ads/upper-ads.component';
import { BottomAdsComponent } from './components/home/static/bottom-ads/bottom-ads.component';
import {ProductsService} from './core/services/products.service';
import {CategoriesService} from './core/services/categories.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    UpperAdsComponent,
    BottomAdsComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RadarSpinnerModule,
    ToastrModule.forRoot(),
    AngularFileUploaderModule,
    Ng2CloudinaryModule,
    AppStoreModule,
    SharedModule,
    UsersModule,
    ProductsModule,
    CategoriesModule
  ],
  providers: [
    ToastrService,
    MessageActions,
    CanActivateRouteGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
