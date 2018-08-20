import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {BannerComponent} from './banner/banner.component';
import {RouterModule} from '@angular/router';
import { IconsComponent } from './static/icons/icons.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [NavigationComponent, FooterComponent, BannerComponent, IconsComponent ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [NavigationComponent, FooterComponent, BannerComponent, IconsComponent]
})

export class SharedModule {

}
