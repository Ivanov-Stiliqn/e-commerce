import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {BannerComponent} from './banner/banner.component';
import {RouterModule} from '@angular/router';
import { IconsComponent } from './static/icons/icons.component';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '../../core/pipes/currency.pipe';

@NgModule({
  declarations: [NavigationComponent, FooterComponent, BannerComponent, IconsComponent, CurrencyPipe ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [NavigationComponent, FooterComponent, BannerComponent, IconsComponent, CurrencyPipe]
})

export class SharedModule {

}
