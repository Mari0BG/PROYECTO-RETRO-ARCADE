import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  // Método para crear un rating
  createRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(`${apiUrls.ratingServiceApi}create`, rating);
  }

  // Método para actualizar la valoración de un rating por su ID
  updateRating(rating: Rating): Observable<any> {
    return this.http.put(`${apiUrls.ratingServiceApi}update/${rating._id}`, rating);
  }

  // Método para obtener todos los ratings
  getAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${apiUrls.ratingServiceApi}getAll`);
  }

  // Método para obtener un rating por su ID
  getRatingById(id: string): Observable<Rating> {
    return this.http.get<Rating>(`${apiUrls.ratingServiceApi}getAll/${id}`);
  }

  // Método para obtener todos los ratings de un usuario por su _idUser
  getAllRatingsByUserId(id: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${apiUrls.ratingServiceApi}getAll/userRating/${id}`);
  }

  // Método para obtener todos los ratings de un usuario por su _idUser
  getAllRatingsByProductId(id: string): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${apiUrls.ratingServiceApi}getAll/productRating/${id}`);
  }


  // Método para borrar un rating por su ID
  deleteRating(id: string): Observable<any> {
    return this.http.delete(`${apiUrls.ratingServiceApi}delete/${id}`);
  }
}
