import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RoutesModule} from '../../core/routes.module';

@NgModule({
  declarations: [NavigationComponent, FooterComponent ],
  imports: [CommonModule, BrowserAnimationsModule, RoutesModule],
  exports: [NavigationComponent, FooterComponent]
})

export class SharedModule {

}
