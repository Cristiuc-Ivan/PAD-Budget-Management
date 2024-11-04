import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import {MaterialModule} from '../../shared/material.module';
import {ComponentsModule} from '../../shared/components/components.module';

@NgModule({
  declarations: [
    HomeComponent   // Объявляем HomePageComponent
  ],
  imports: [
    CommonModule,       // Общие директивы Angular
    RouterModule,       // Поддержка маршрутизации
    MaterialModule,
    ComponentsModule,
    // Импортируем MaterialModule
  ],
  exports: [
    HomeComponent   // Экспортируем компонент, если потребуется
  ]
})
export class HomeModule { }
