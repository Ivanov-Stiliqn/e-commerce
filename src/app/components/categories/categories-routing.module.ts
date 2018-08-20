import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryAddComponent} from './category-add/category-add.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {AdminGuard} from '../../core/guards/admin.guard';

const categoriesRoutes: Routes = [
  {path: 'category-add', component: CategoryAddComponent, canActivate: [AdminGuard]},
  {path: 'category-edit/:id', component: CategoryEditComponent, canActivate: [AdminGuard]},
  {path: 'all', component: CategoriesPageComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(categoriesRoutes)
  ],
  exports: [RouterModule]
})

export class CategoriesRoutingModule {}
