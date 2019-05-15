import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './components/basic/basic.component';
import { LoginComponent } from './components/login/login.component';
import { LogInService } from './components/login/login.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDataService } from './components/book-data.service';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TodosDataService } from './components/todo-list/todo.data.service';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './components/todo-list/todos.effects';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    LoginComponent,
    BookListComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([TodosEffects])
  ],
  providers: [LogInService, BookDataService, TodosDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
