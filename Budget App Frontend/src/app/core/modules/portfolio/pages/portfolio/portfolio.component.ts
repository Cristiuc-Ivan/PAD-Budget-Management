import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TransactionDialogComponent} from '../transaction-dialog/transaction-dialog.component';
import {TransactionService} from '../../../../services/transaction.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false,
})
export class PortfolioComponent implements OnInit {
  @ViewChild('transactionDialog') transactionDialog!: TemplateRef<any>;

  transactionForm: FormGroup;
  range: FormGroup;
  transactions: any[] = [];
  originalTransactions: any[] = [];
  displayedColumns: string[] = ['type', 'amount', 'date', 'category', 'actions'];
  totalCapital = 0;
  customDateFilter = false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      type: [''],
      amount: [''],
      date: [''],
      category: [''],
    });

    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  // Загрузка всех транзакций
  loadTransactions(): void {
    this.transactionService.getAllTransactionsService().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.originalTransactions = transactions;
        this.calculateTotalCapital();
      },
      error: (err) => {
        console.error('Error loading transactions:', err);
      },
    });
  }

  // Открытие диалога добавления транзакции
  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '20vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addTransaction(result); // Добавляем транзакцию в основной список
      }
    });
  }

  // Добавление новой транзакции
  addTransaction(transaction: { type: string; amount: number; date: string; category: string }): void {
    if (!transaction || !transaction.type || !transaction.amount || !transaction.date || !transaction.category) {
      console.error('Invalid transaction data, cannot proceed.');
      return;
    }

    this.transactionService.addTransactionService(transaction).subscribe({
      next: (newTransaction) => {
        this.transactions.push(newTransaction);
        this.originalTransactions.push(newTransaction);
        this.updateTotalCapital(newTransaction); // Обновляем капитал
      },
      error: (err) => {
        console.error('Error adding transaction:', err);
      },
    });
  }


  filterTransactions(event: any): void {
    const filterType = event.value;

    if (filterType === 'custom') {
      const { start, end } = this.range.value;
      this.transactionService
        .filterTransactionsByCustomDateService(start, end)
        .subscribe({
          next: (filteredTransactions) => {
            this.transactions = filteredTransactions;
          },
          error: (err) => {
            console.error('Failed to filter transactions:', err);
          },
        });
    } else {
      this.transactionService.filterTransactionsByTypeService(filterType).subscribe({
        next: (filteredTransactions) => {
          this.transactions = filteredTransactions;
        },
        error: (err) => {
          console.error('Failed to filter transactions:', err);
        },
      });
    }
  }


  // Обновление общего капитала
  updateTotalCapital(transaction: any): void {
    this.totalCapital +=
      transaction.type === 'Revenues' ? +transaction.amount : -transaction.amount;
  }

  // Расчет общего капитала при загрузке
  calculateTotalCapital(): void {
    this.totalCapital = this.transactions.reduce((acc, transaction) => {
      return acc + (transaction.type === 'Revenues' ? +transaction.amount : -transaction.amount);
    }, 0);
  }

  // Фильтрация транзакций по диапазону дат
  applyCustomDateFilter(): void {
    const { start, end } = this.range.value;
    if (start && end) {
      this.transactions = this.originalTransactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });
    } else {
      console.error('Both start and end dates must be selected');
    }
  }

  updateTransaction(transaction: any): void {
    this.transactionService.updateTransactionService(transaction.id, transaction).subscribe({
      next: (updatedTransaction) => {
        // Обновляем локальные данные
        const index = this.originalTransactions.findIndex(t => t.id === transaction.id);
        if (index > -1) {
          this.originalTransactions[index] = updatedTransaction;
          this.transactions = [...this.originalTransactions];
          this.calculateTotalCapital(); // Пересчитываем капитал
        }
      },
      error: (err) => {
        console.error('Failed to update transaction:', err);
      }
    });
  }

  deleteTransaction(transactionId: number): void {
    this.transactionService.deleteTransactionService(transactionId).subscribe({
      next: () => {
        // Удаляем транзакцию из локальных данных
        this.originalTransactions = this.originalTransactions.filter(t => t.id !== transactionId);
        this.transactions = [...this.originalTransactions];
        this.calculateTotalCapital(); // Пересчитываем капитал
      },
      error: (err) => {
        console.error('Failed to delete transaction:', err);
      }
    });
  }
}
