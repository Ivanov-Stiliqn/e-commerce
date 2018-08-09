import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/landing-page/home.component';
import {LoginComponent} from '../components/users/login-page/login.component';
import {RegisterComponent} from '../components/users/register-page/register.component';
import {CanActivateRouteGuard} from './guards/auth.guard';
import {ProductsPageComponent} from '../components/products/products-page/products-page.component';
import {ProductDetailsComponent} from '../components/products/product-details/product-details.component';
import {ProductAddComponent} from '../components/products/product-add/product-add.component';
import {CategoryAddComponent} from '../components/categories/category-add/category-add.component';
import {CategoriesModule} from '../components/categories/categories.module';
import {ProductsModule} from '../components/products/products.module';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'categories', loadChildren: () => CategoriesModule},
  {path: 'products', loadChildren: () => ProductsModule}
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutesModule {}
