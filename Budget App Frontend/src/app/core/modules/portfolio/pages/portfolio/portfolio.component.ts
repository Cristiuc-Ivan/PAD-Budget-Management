import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TransactionDialogComponent} from '../transaction-dialog/transaction-dialog.component';
import {range} from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  @ViewChild('transactionDialog') transactionDialog!: TemplateRef<any>;
  transactionForm: FormGroup;
  range: FormGroup;
  transactions: any[] = [];
  originalTransactions: any[] = [];
  displayedColumns: string[] = ['type', 'amount', 'date', 'category'];
  totalCapital = 0;
  customDateFilter = false;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      type: [''],
      amount: [''],
      date: [''],
      category: ['']
    });

    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
  }

  openTransactionDialog() {
    if (this.transactionDialog) {
      this.dialog.open(TransactionDialogComponent, {
        width: '20vw',
        maxHeight: '90vh',
        panelClass: 'custom-dialog-container'
      });
    }
  }

  updateTotalCapital(transaction: any) {
    this.totalCapital += transaction.type === 'Revenues' ? +transaction.amount : -transaction.amount;
  }

  applyCustomDateFilter(): void {
    const { start, end } = this.range.value;
    if (start && end) {
      this.transactions = this.originalTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });
    } else {
      console.error('Both start and end dates must be selected');
    }
  }

  filterTransactions(event: any) {
    const filterType = event.value;
    const today = new Date();

    this.customDateFilter = filterType === 'custom';

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
        this.transactions = [...this.originalTransactions];
        break;
      default:
        break;
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
