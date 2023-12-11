import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../api.urls';
import { User } from '../models/user';
User

@Injectable({
  providedIn: 'root'
})
export class AdminControlService {

  userSelected!: User;
  users!: User[];

  constructor(private http: HttpClient) {}

  showUsers(){
    return this.http.get<any>(`${apiUrls.userServiceApi}` );
  }

  
}
