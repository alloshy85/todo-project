/*
 * Copyright (c) 2025
 * All rights reserved.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  private loggedInUserNameSubject = new BehaviorSubject<string | null>(this.getUserNameFromToken());
  public loggedInUserName$ = this.loggedInUserNameSubject.asObservable();

  constructor(private http: HttpClient) {}
  private getInitialUserName(): string | null {
    if (typeof window !== 'undefined') {
      return this.getUserNameFromToken();
    }
    return null;
  }

  private getUserNameFromToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload?.user?.email || null;
        } catch (error) {
          return null;
        }
      }
    }
    return null;
  }


  login(user: UserData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          const userName = this.getUserNameFromToken();
          this.loggedInUserNameSubject.next(userName);
        }
      })
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.loggedInUserNameSubject.next(null);
    }
  }

  getLoggedInUserName(): string | null {
    return this.loggedInUserNameSubject.value;
  }
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
}