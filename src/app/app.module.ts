import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RoutesModule} from './core/routes.module';
import {UsersModule} from './components/users/users.module';
import {HomeComponent} from './components/home/home.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RadarSpinnerModule,
    ToastrModule.forRoot(),
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
