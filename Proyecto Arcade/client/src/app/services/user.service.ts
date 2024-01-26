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

  // Metodo para traer a usuario especifico
  getUserById(userId: String){
    return this.http.get<User>(`${apiUrls.userServiceApi}/${userId}`);
  }

  // Metodo para traer todos usuarios
  getAllUsers(){
    return this.http.get<User[]>(`${apiUrls.userServiceApi}getAll`);
  }

  // Metodo para crear usuario
  createUser(user: User) {
    return this.http.post(`${apiUrls.userServiceApi}create`, user);
  }

  // Metodo para actualizar usuario
  updateUser(user: User){
    return this.http.put(`${apiUrls.userServiceApi}${user._id}`, user);
  }

  // Metodo para eliminar usuario
  deleteUser(userId: String) {
    return this.http.delete(`${apiUrls.userServiceApi}${userId}`);
  }
}
