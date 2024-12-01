import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TransactionDialogComponent} from '../transaction-dialog/transaction-dialog.component';
import {TransactionService} from '../../../../services/transaction.service';
import {TransactionEditDialogComponent} from '../transaction-edit-dialog/transaction-edit-dialog.component';
import {CurrencyService} from '../../../../services/currency.service';

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
  // displayedColumns: string[] = ['type', 'amountMDL', 'amountUSD', 'amountEUR', 'date', 'category', 'actions'];
  displayedColumns: string[] = ['type', 'amount', 'date', 'category', 'actions'];

  totalCapital = 0;
  currentFilterType: string = 'all';
  currencyRates: { [key: string]: number } = {};

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private currencyService: CurrencyService
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
    // this.currencyService.getCurrencyRates().subscribe({
    //   next: (rates) => {
    //     this.currencyRates = rates;
    //   },
    //   error: (err) => {
    //     console.error('Error loading currency rates:', err);
    //   },
    // });

    this.transactionService.transactions$.subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.originalTransactions = transactions;
        this.calculateTotalCapital();
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
      },
    });

    // Загрузка данных при инициализации
    this.transactionService.getAllTransactionsService();
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

  // Обновление общего капитала
  updateTotalCapital(transaction: any): void {
    this.totalCapital +=
      transaction.type === 'Revenues' ? +transaction.amount : -transaction.amount;
  }

  // Расчет общего капитала при загрузке
  calculateTotalCapital(): void {
    this.totalCapital = this.transactions.reduce((acc, transaction) => {
      // Проверяем тип транзакции и корректно обновляем капитал
      return acc + (transaction.type === 'Revenue' ? +transaction.amount : -transaction.amount);
    }, 0);
  }

  convertAmount(amount: number, currency: string): number {
    if (!this.currencyRates || !this.currencyRates[currency]) {
      return amount; // Возврат оригинального значения, если нет курса
    }
    return amount * this.currencyRates[currency];
  }

  // Добавление новой транзакции
  addTransaction(transaction: { type: string; amount: number; date: string; category: string }): void {
    if (!transaction.type || !transaction.amount || !transaction.date || !transaction.category) {
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

  // Фильтрация транзакций по диапазону дат
  applyCustomDateFilter(): void {
    if (this.currentFilterType === 'custom') {
      const { start, end } = this.range.value;
      if (start && end) {
        this.transactions = this.originalTransactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= new Date(start) && transactionDate <= new Date(end);
        });
      } else {
        console.error('Both start and end dates must be selected');
      }
    } else {
      this.filterTransactionsByType(this.currentFilterType);
    }
  }

  filterTransactionsByType(filterType: string): void {
    const today = new Date();

    switch (this.currentFilterType) {
      case 'day':
        // Фильтрация по сегодняшнему дню
        this.transactions = this.originalTransactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return (
            transactionDate.toDateString() === today.toDateString()
          );
        });
        break;

      case 'week':
        // Фильтрация за последние 7 дней
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        this.transactions = this.originalTransactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= weekAgo && transactionDate <= today;
        });
        break;

      case 'month':
        // Фильтрация за последний месяц
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        this.transactions = this.originalTransactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= monthAgo && transactionDate <= today;
        });
        break;

      case 'year':
        // Фильтрация за последний год
        const yearAgo = new Date();
        yearAgo.setFullYear(today.getFullYear() - 1);
        this.transactions = this.originalTransactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= yearAgo && transactionDate <= today;
        });
        break;

      case 'custom':
        // Фильтрация по выбранному диапазону дат
        this.applyCustomDateFilter();
        break;

      default:
        // Сброс фильтра (показ всех транзакций)
        this.transactions = [...this.originalTransactions];
        break;
    }
  }

  // Открытие формы редактирования транзакции
  openEditDialog(transaction: any): void {
    if (!transaction) {
      console.error('No transaction selected for updating.');
      return;
    }

    const dialogRef = this.dialog.open(TransactionEditDialogComponent, {
      width: '20vw',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
      data: { transaction }, // Передаём данные транзакции в диалог
    });

    dialogRef.afterClosed().subscribe((updatedTransaction) => {
      if (updatedTransaction) {
        this.updateTransaction({ ...transaction, ...updatedTransaction });
      } else {
        console.log('Edit dialog was closed without saving changes.');
      }
    });
  }

  updateTransaction(updatedTransaction: any): void {
    if (!updatedTransaction || !updatedTransaction.id) {
      console.error('No transaction selected for updating.');
      return;
    }

    this.transactionService.updateTransactionService(updatedTransaction.id, updatedTransaction).subscribe({
      next: (response) => {
        // Обновляем локальный список транзакций
        const index = this.transactions.findIndex(t => t.id === updatedTransaction.id);
        if (index !== -1) {
          this.transactions[index] = response;
          this.calculateTotalCapital(); // Пересчёт капитала
        } else {
          console.warn('Updated transaction not found in local list.');
        }
      },
      error: (err) => {
        console.error('Failed to update transaction:', err);
      },
    });
  }


  deleteTransaction(transactionId: number): void {
    this.transactionService.deleteTransactionService(transactionId).subscribe({
      next: () => {
        console.log(`Transaction with ID ${transactionId} deleted successfully`);
        // Перезагружаем страницу
        window.location.reload();
      },
      error: (err) => {
        console.error('Failed to delete transaction:', err);
        window.location.reload();
      },
    });
  }
}
