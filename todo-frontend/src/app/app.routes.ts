/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Routes } from '@angular/router';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { TodoEditComponent } from '../components/todo-edit/todo-edit.component';
import { LoginComponent } from '../components/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'todos', component: HomeComponent },
    { path: 'add', component: TodoEditComponent },
    { path: 'edit/:id', component: TodoEditComponent },
  ];
