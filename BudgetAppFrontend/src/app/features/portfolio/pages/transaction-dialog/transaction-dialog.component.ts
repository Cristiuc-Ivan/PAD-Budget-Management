import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.css'
})
export class TransactionDialogComponent {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>
  ) {
    // Создаем форму с полями для типа, суммы, даты и категории
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  // Метод для добавления транзакции
  addTransaction() {
    if (this.transactionForm.valid) {
      console.log('Transaction:', this.transactionForm.value);
      // Закрыть диалог и вернуть данные формы
      this.dialogRef.close(this.transactionForm.value);
    }
  }

  // Метод для закрытия диалога без сохранения
  closeDialog() {
    this.dialogRef.close();
  }
}
