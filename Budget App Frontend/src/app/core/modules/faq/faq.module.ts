import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FaqComponent} from './pages/faq/faq.component';
import {MaterialModule} from '../../../shared/material.module';
import {ComponentsModule} from '../../../shared/components/components.module';

const routes: Routes = [{ path: '', component: FaqComponent }];

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ComponentsModule,
  ],
  exports: [
    FaqComponent
  ]
})
export class FaqModule { }
