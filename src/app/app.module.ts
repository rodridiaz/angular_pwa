import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
