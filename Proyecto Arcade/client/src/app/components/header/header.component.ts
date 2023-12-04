import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  isLoggedIn: boolean = false
  isAdmin: boolean = false

  logout() {
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_role")
    this.authService.isLoggedIn$.next(false)
    this.authService.isAdmin$.next(false)
  }

  adminControl() {
    alert('mondongo')
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = this.authService.isLoggedIn()
    })
    this.authService.isAdmin$.subscribe(res => {
      this.isAdmin = this.authService.isAdmin()
    })
  }


}
