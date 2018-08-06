import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoutesModule} from '../../core/routes.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CategoriesService} from '../../core/services/categories.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RoutesModule, FormsModule, HttpClientModule],
  exports: [],
  providers: [CategoriesService]
})
export class CategoriesModule {}
