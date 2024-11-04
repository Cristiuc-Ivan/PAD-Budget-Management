import {FooterComponent} from './footer/footer.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MaterialModule} from '../material.module';
import {NavigationComponent} from './navigation/navigation.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MaterialModule,
  ],
  exports: [
    FooterComponent,
    NavigationComponent,
  ]
})
export class ComponentsModule {

}
