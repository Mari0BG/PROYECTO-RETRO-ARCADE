import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../../app/validator/confirmPassword.validator';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export default class ResetComponent implements OnInit{

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}
  resetForm!: FormGroup

  token!: string
  ngOnInit(): void {

    this.resetForm = this.fb.group({
      password:['', Validators.required],
      confirmPassword:['',Validators.required]
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    })

    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token']
      console.log(this.token)
    })
  }
  reset(){
    console.log(this.resetForm.value)
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj)
    .subscribe({
      next:(res)=>{
        alert(res.message)
        this.resetForm.reset()
        this.router.navigate(['login'])
      },
      error:(err)=> {
        alert(err.error.message)
      }
    })
  }

}
