import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-edit-dialog',
  templateUrl: './transaction-edit-dialog.component.html',
  styleUrl: './transaction-edit-dialog.component.css',
  standalone: false
})
export class TransactionEditDialogComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // данные переданные в диалог
  ) {
    // Инициализация формы с переданными данными
    this.transactionForm = this.fb.group({
      type: [data.transaction.type|| 'Revenues', Validators.required],
      amount: [data.transaction.amount, [Validators.required, Validators.min(0.01)]],
      date: [data.transaction.date, Validators.required],
      category: [data.transaction.category, Validators.required],
    });
  }

  // Закрытие диалога с результатом
  editTransaction(): void {
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value); // возвращаем данные
    } else {
      console.error('Form is invalid:', this.transactionForm.errors);
    }
  }

  // Метод для закрытия диалога без сохранения
  closeDialog() {
    this.dialogRef.close();
  }
}
