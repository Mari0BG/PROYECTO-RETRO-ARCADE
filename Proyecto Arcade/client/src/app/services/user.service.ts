import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; // Ajusta la ruta según tu estructura de archivos
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(userId: string){
    return this.http.get<User>(`${apiUrls.userServiceApi}getById/${userId}`);
  }

  getAllUsers(){
    return this.http.get<User[]>(`${apiUrls.userServiceApi}getAll`);
  }

  createUser(user: User) {
    return this.http.post(`${apiUrls.userServiceApi}create`, user);
  }

  updateUser(user: User){
    return this.http.put(`${apiUrls.userServiceApi}${user._id}`, user);
  }

  deleteUser(userId: string) {
    return this.http.delete(`${apiUrls.userServiceApi}${userId}`);
  }
}
