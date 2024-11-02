import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './features/home/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // корневой маршрут по умолчанию
  // другие маршруты
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
