import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmPasswordValidator } from '../../../app/validator/confirmPassword.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export default class RegisterComponent implements OnInit {

  // Inyectar FormBuilder directamente en el constructor
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  registerForm!: FormGroup;

  ngOnInit(): void {
    // Utilizar this.fb en lugar de inject(FormBuilder)
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    }
    );
  }

  register(){
    this.authService.registerService(this.registerForm.value)
    .subscribe({
      next:(res)=>{
        alert("User Created")
        this.registerForm.reset()
        this.router.navigate(['login'])
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
