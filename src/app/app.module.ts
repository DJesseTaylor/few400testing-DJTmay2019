import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './components/basic/basic.component';
import { LoginComponent } from './components/login/login.component';
import { LogInService } from './components/login/login.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDataService } from './components/book-list/book-data.service';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    LoginComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LogInService, BookDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
