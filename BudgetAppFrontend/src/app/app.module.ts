import {AppComponent} from './app.component';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from './shared/material.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HomeModule} from './features/home/home.module';
import {ComponentsModule} from './shared/components/components.module';
import {FaqModule} from './features/faq/faq.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    HomeModule,
    FaqModule,
    ComponentsModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
