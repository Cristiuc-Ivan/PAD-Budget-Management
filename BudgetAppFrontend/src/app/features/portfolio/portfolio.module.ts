import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../shared/material.module';
import {ComponentsModule} from '../../shared/components/components.module';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TransactionDialogComponent} from './pages/transaction-dialog/transaction-dialog.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    TransactionDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    PortfolioComponent,
    TransactionDialogComponent
  ]
})
export class PortfolioModule { }
