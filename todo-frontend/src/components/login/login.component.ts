/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/user-data';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'], 
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  user: UserData = { email: '', password: '' };
  @Output() loginSuccess = new EventEmitter<UserData>();
  loggedIn = false;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.loggedIn = true;
        this.loginSuccess.emit(this.user);
        this.router.navigate(['/todos']); // توجيه المستخدم إلى صفحة المهام بعد النجاح
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
