import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../shared/material.module';
import {ComponentsModule} from '../../shared/components/components.module';
import {PortfolioComponent} from './pages/portfolio/portfolio.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {TransactionDialogComponent} from './pages/transaction-dialog/transaction-dialog.component';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';

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
  ],
  exports: [
    PortfolioComponent,
    TransactionDialogComponent
  ]
})
export class PortfolioModule { }
