import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  // Inyectar HttpClient directamente en el constructor
  constructor(private http: HttpClient) {
        const storedUserRole = localStorage.getItem("user_role");
    
        if (storedUserRole) {
          this.isAdminSubject.next(storedUserRole === 'true');
        }
      }
  

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
// AuthService

  isAdmin() {
    return !!localStorage.getItem("user_role");
  }



  setAdminStatus(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
  }

  isLoggedIn$ = new BehaviorSubject<boolean>(false)

  // Para poder coger el ID del usuario logeado
  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
}
