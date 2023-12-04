import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../../app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  loginForm!: FormGroup;

  ngOnInit(): void {
    // Utilizar this.fb en lugar de inject(FormBuilder)
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],

    });
  }
  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        alert("Login is success "+res.data._id)
        localStorage.setItem("user_id", res.data._id)
        localStorage.setItem("user_role", res.data.isAdmin)
        this.authService.isLoggedIn$.next(true)
        this.authService.isAdmin$.next(true)
        this.router.navigate(['home'])
        this.loginForm.reset()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
