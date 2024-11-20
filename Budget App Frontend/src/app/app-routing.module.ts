import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./core/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('./core/modules/faq/faq.module').then((m) => m.FaqModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./core/modules/portfolio/portfolio.module').then((m) => m.PortfolioModule),
  },
  {
    path: 'login',
    redirectTo: 'auth/login',
  },
  {
    path: 'register',
    redirectTo: 'auth/register',
  },
  {
    path: '**', // if path is unknown
    redirectTo: 'home', // redirect to home page
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
