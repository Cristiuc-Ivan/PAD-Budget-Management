import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
