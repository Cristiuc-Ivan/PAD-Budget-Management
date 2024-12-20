import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from '../../../shared/material.module';
import {ComponentsModule} from '../../../shared/components/components.module';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ComponentsModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
