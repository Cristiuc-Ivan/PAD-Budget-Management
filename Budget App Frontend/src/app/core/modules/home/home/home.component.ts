import { Component } from '@angular/core';

interface Transaction {
  date: Date;
  type: string;
  amount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{

}
