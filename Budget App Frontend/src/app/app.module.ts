import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from './shared/material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HomeModule} from './core/modules/home/home.module';
import {ComponentsModule} from './shared/components/components.module';
import {FaqModule} from './core/modules/faq/faq.module';
import {AuthModule} from './core/modules/auth/auth.module';
import {PortfolioModule} from './core/modules/portfolio/portfolio.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    HomeModule,
    FaqModule,
    AuthModule,
    PortfolioModule,
    ComponentsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
