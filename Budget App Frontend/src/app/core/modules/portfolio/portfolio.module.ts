import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransactionDialogComponent} from './pages/transaction-dialog/transaction-dialog.component';
import {MaterialModule} from '../../../shared/material.module';
import {ComponentsModule} from '../../../shared/components/components.module';
import {AuthGuard} from '../../guards/auth.guard';
import {TransactionEditDialogComponent} from './pages/transaction-edit-dialog/transaction-edit-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    PortfolioComponent,
    TransactionDialogComponent,
    TransactionEditDialogComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ComponentsModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  exports: [
    PortfolioComponent,
    TransactionDialogComponent,
    TransactionEditDialogComponent
  ]
})
export class PortfolioModule { }
