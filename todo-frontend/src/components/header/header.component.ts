/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private auth:AuthService,private router:Router){}
  logout(){
    this.auth.logout();
    this.router.navigateByUrl("");

  }


}
