/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo'; 
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class TodoEditComponent implements OnInit {
  todoId: string | null = null;
  todoForm: FormGroup;
  todo: Todo | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {
    this.todoForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      status: new FormControl('To Do'),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.todoId = params.get('id');
      if (this.todoId) {
        this.loadTodo();
      }
    });
  }

  loadTodo(): void {
    if (this.todoId) {
      this.todoService.getTaskById(this.todoId).subscribe(todo => {
        this.todo = todo;
        this.todoForm.patchValue({
          title: todo.title,
          description: todo.description,
          status: todo.status,
        });
      });
    }
  }

  updateTodo(): void {
    if (this.todoId && this.todoForm.valid) {
      const updatedTodo: Todo = {
        _id: this.todoId,
        ...this.todoForm.value,
        status: this.todoForm.value.status 
      };
      this.todoService.updateTodo(updatedTodo).subscribe(() => {
        this.router.navigate(['/todos']); 
      });
    }
  }


  cancel(): void {
    this.router.navigate(['/']);
  }
}