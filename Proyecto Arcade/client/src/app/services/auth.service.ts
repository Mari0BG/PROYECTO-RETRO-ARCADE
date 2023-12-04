import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Inyectar HttpClient directamente en el constructor
  constructor(private http: HttpClient) {}

  registerService(registerObj: any) {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }
  
  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, {email: email});
  }

  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }

  isLoggedIn(){
    return !!localStorage.getItem("user_id")
  }
  isAdmin(){
    return !!localStorage.getItem("user_role")
  }

  isAdmin$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = new BehaviorSubject<boolean>(false)

}
