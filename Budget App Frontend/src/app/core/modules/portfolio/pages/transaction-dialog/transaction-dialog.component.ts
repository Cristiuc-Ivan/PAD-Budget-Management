import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {TransactionService} from '../../../../services/transaction.service';

@Component({
    selector: 'app-transaction-dialog',
    templateUrl: './transaction-dialog.component.html',
    styleUrl: './transaction-dialog.component.css',
    standalone: false
})
export class TransactionDialogComponent {
  transactionForm: FormGroup;
  transactions: any[] = [];
  originalTransactions: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private transactionService: TransactionService
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
  addTransaction(transaction: {
    type: string;
    amount: number;
    date: string;
    category: string;
  }): void {
    this.transactionService.addTransactionService(transaction).subscribe({
      next: (newTransaction) => {
        console.log('Transaction added successfully:', newTransaction);

        // Добавляем транзакцию в текущий список
        this.transactions.push(newTransaction);

        // Обновляем исходный массив транзакций, если он используется для фильтрации/отмены изменений
        this.originalTransactions.push(newTransaction);
      },
      error: (err) => {
        console.error('Error adding transaction:', err);
      },
    });
  }

  // Метод для закрытия диалога без сохранения
  closeDialog() {
    this.dialogRef.close();
  }
}
