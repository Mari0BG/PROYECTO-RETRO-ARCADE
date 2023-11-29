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
export class HeaderComponent implements OnInit{

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}
  
  isLoggedIn: boolean = false
  
  logout(){
    localStorage.removeItem("user_id")
    this.authService.isLoggedIn$.next(false)
  }
  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn()
    })
  }
}
