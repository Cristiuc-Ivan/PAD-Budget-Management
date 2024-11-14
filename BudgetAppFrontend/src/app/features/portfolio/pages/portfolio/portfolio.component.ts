import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TransactionDialogComponent} from '../transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  @ViewChild('transactionDialog') transactionDialog!: TemplateRef<any>;
  transactionForm: FormGroup;
  transactions: any[] = [];
  originalTransactions: any[] = [];
  displayedColumns: string[] = ['type', 'amount', 'date', 'category'];
  totalCapital = 0;
  customDateFilter = false;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      type: [''],
      amount: [''],
      date: [''],
      category: ['']
    });
  }

  openTransactionDialog() {
    if (this.transactionDialog) {
      this.dialog.open(TransactionDialogComponent);
    }
  }

  addTransaction() {
    const transaction = this.transactionForm.value;
    this.transactions.push(transaction);
    this.updateTotalCapital(transaction);
    this.dialog.closeAll();
    this.transactionForm.reset();
  }

  updateTotalCapital(transaction: any) {
    this.totalCapital += transaction.type === 'Revenues' ? +transaction.amount : -transaction.amount;
  }

  filterTransactions(event: any) {
    const filterType = event.target.value;
    const today = new Date();

    switch (filterType) {
      case 'day':
        this.transactions = this.originalTransactions.filter(transaction =>
          this.isSameDay(new Date(transaction.date), today)
        );
        break;
      case 'week':
        this.transactions = this.originalTransactions.filter(transaction =>
          this.isWithinLastDays(new Date(transaction.date), 7)
        );
        break;
      case 'month':
        this.transactions = this.originalTransactions.filter(transaction =>
          this.isWithinLastDays(new Date(transaction.date), 30)
        );
        break;
      case 'year':
        this.transactions = this.originalTransactions.filter(transaction =>
          new Date(transaction.date).getFullYear() === today.getFullYear()
        );
        break;
      case 'all':
        this.transactions = [...this.originalTransactions]; // Show all transactions
        break;
      case 'custom':
        this.customDateFilter = true;
        break;
      default:
        break;
    }
  }

  onStartDateChange(event: any) {
    this.startDate = event.target.value;
  }

  onEndDateChange(event: any) {
    this.endDate = event.target.value;
  }

  applyCustomDateFilter() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      this.transactions = this.originalTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });
      this.customDateFilter = false;
    }
  }


  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  private isWithinLastDays(date: Date, days: number): boolean {
    const today = new Date();
    const pastDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    return date >= pastDate && date <= today;
  }
}
