import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryAddComponent} from './category-add/category-add.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';

const categoriesRoutes: Routes = [
  {path: 'category-add', component: CategoryAddComponent},
  {path: 'category-edit/:id', component: CategoryEditComponent},
  {path: 'all', component: CategoriesPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(categoriesRoutes)
  ],
  exports: [RouterModule]
})

export class CategoriesRoutingModule {}
