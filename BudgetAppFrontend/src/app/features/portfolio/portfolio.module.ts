import {NgModule} from '@angular/core';
import {HomeComponent} from '../home/pages/home/home.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../shared/material.module';
import {ComponentsModule} from '../../shared/components/components.module';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PortfolioComponent
  ]
})
export class PortfolioModule { }
