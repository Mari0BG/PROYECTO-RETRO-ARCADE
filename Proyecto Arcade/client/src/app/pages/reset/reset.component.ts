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
  reset() {
    console.log(this.resetForm.value);
  
    const resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    };
    console.log(resetObj);
    this.authService.resetPasswordService(resetObj).subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        if (err.status === 500) {
          alert('Error interno del servidor. Por favor, inténtalo de nuevo más tarde.');
        } else if (err.status === 400) {
          alert('Token no válido o expirado. Solicita un nuevo enlace de restablecimiento de contraseña.');
        } else {
          alert('Error desconocido. Por favor, inténtalo de nuevo.');
        }
      }
    });
  }
  

}
