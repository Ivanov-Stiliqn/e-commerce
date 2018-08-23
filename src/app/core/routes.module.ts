import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../components/home/landing-page/home.component';
import {LoginComponent} from '../components/users/login-page/login.component';
import {RegisterComponent} from '../components/users/register-page/register.component';
import {CategoriesModule} from '../components/categories/categories.module';
import {ProductsModule} from '../components/products/products.module';
import {CartModule} from '../components/cart/cart.module';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'categories', loadChildren: () => CategoriesModule},
  {path: 'products', loadChildren: () => ProductsModule},
  {path: 'cart', loadChildren: () => CartModule}
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutesModule {}
