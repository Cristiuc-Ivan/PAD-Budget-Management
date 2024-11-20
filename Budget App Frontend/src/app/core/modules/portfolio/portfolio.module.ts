import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TransactionDialogComponent} from './pages/transaction-dialog/transaction-dialog.component';
import {MaterialModule} from '../../../shared/material.module';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AuthGuard} from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    canActivate: [AuthGuard], // Применение Guard
  },
];

@NgModule({
  declarations: [
    PortfolioComponent,
    TransactionDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PortfolioComponent,
    TransactionDialogComponent
  ]
})
export class PortfolioModule { }
