/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component } from '@angular/core';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [TodoFormComponent, TodoListComponent, HeaderComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
