import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loaderService } from 'service/loaderService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { myInterceptor } from 'service/myInterceptor';
import { LoaderComponentComponent } from './loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule, MatButtonModule } from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers:  [
                loaderService,
                {provide: HTTP_INTERCEPTORS, useClass: myInterceptor, multi: true}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
