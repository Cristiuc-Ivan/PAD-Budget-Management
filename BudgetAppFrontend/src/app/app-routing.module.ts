import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './features/home/pages/home/home.component';
import {FaqComponent} from './features/faq/pages/faq/faq.component';
import {RegisterComponent} from './features/auth/pages/register/register.component';
import {LoginComponent} from './features/auth/pages/login/login.component';
import {PortfolioComponent} from './features/portfolio/pages/portfolio/portfolio.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'portfolio', component: PortfolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
