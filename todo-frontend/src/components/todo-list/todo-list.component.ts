/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { FilterPipe } from '../../app/pipes/filter.pipe';
import { Route, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-todo-list',
  imports:[CommonModule,FilterPipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  editingTodo: Todo | null = null;
  loggedIn:boolean=false;
  loggedInUserName: string | null = null;
  private authSubscription: Subscription | undefined;

  constructor(private todoService: TodoService,private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
        if (token) {
          this.loggedIn = true;
          this.loadTodos(); 
        }
        else {
          this.router.navigate(['/login']); // إذا لم يكن هناك رمز مميز، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
        }
        }
        this.authSubscription = this.authService.loggedInUserName$.subscribe(userName => {
          this.loggedInUserName = userName;
        });
      }
      ngOnDestroy(): void {
        if (this.authSubscription) {
          this.authSubscription.unsubscribe();
        }
      }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.editingTodo = null;
      
      this.todos = todos.map(todo => ({ ...todo, showFullDescription: false }));
    });
  }

  updateStatus(todo: Todo, newStatus: 'To Do' | 'Done'): void {
    const updatedTodo: Todo = { ...todo, status: newStatus }; 
    this.todoService.updateTodo(updatedTodo).subscribe(() => {
      this.loadTodos();
    });
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  isTodo(todo: Todo): boolean {
    return todo.status === 'To Do';
  }

  isInProgress(todo: Todo): boolean {
    return todo.status === 'In Progress';
  }

  isDone(todo: Todo): boolean {
    return todo.status === 'Done';
  }
  editTodo(todo: Todo): void {
    this.editingTodo = { ...todo };
    this.router.navigate(['/edit', todo._id]);
  }

  cancelEdit(): void {
    this.editingTodo = null;
  }

  updateTodo(): void {
    if (this.editingTodo) {
      this.todoService.updateTodo(this.editingTodo).subscribe(() => {
        this.loadTodos();
      });
    }
  }
}