import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class HomeModule { }
