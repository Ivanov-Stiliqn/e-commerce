import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsPageComponent} from './products-page/products-page.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductsSearchComponent} from './products-search/products-search.component';
import {AdminGuard} from '../../core/guards/admin.guard';

const productsRoutes: Routes = [
  {path: 'category/:id', component: ProductsPageComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
  {path: 'product-add', component: ProductAddComponent, canActivate: [AdminGuard]},
  {path: 'product-edit/:id', component: ProductEditComponent, canActivate: [AdminGuard]},
  {path: 'products-search/:search', component: ProductsSearchComponent},

];

@NgModule({
  imports: [RouterModule.forChild(productsRoutes)],
  exports: [RouterModule]
})

export class ProductsRoutingModule {}
