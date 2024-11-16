import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {RouterLinkActive} from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatNativeDateModule, MatOptgroup, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@NgModule({
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerToggle,
    MatDatepicker,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatDatepickerInput,
    MatNativeDateModule,
    MatError,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatHint,
    MatSuffix,
    RouterLinkActive,
  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerToggle,
    MatDatepicker,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatDatepickerInput,
    MatDialogModule,
    MatNativeDateModule,
    MatError,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatHint,
    MatSuffix,
    RouterLinkActive,
  ]
})
export class MaterialModule { }
