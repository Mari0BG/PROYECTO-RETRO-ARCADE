import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule ,FormBuilder, FormGroup, Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule ],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export default class ForgetPasswordComponent implements OnInit{
  forgetForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
  }


  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }
  
  submit() {
    console.log(this.forgetForm.value);
  
    this.authService.sendEmailService(this.forgetForm.value.email)
      .pipe(
        tap({
          next: (res) => alert(res.message),
          error: (err) => alert(err.error.message)
        })
      )
    .subscribe({
      next:(res)=>{
        alert(res.message)
        this.forgetForm.reset()
      },
      error:(err)=> {
        alert(err.error.message)
      }
    })
  }
}
