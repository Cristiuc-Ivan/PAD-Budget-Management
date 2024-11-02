import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeModule} from './modules/home/home.module';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
]

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CoreModule {

}
