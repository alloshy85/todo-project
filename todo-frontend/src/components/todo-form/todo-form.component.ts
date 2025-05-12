/*
 * Copyright (c) 2025
 * All rights reserved.
 */

import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit { 
  todoForm = new FormGroup({ 
    title: new FormControl('', Validators.required)
  });

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const newTodo: Todo = { title: this.todoForm.value.title??'', status: 'To Do' };
      this.todoService.addTodo(newTodo).subscribe(() => {
        window.location.reload();
        this.todoForm.reset();
      });
    }
  }
}