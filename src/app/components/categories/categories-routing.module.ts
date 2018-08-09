import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryAddComponent} from './category-add/category-add.component';

const categoriesRoutes: Routes = [
  {path: 'category-add', component: CategoryAddComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(categoriesRoutes)
  ],
  exports: [RouterModule]
})

export class CategoriesRoutingModule {}
