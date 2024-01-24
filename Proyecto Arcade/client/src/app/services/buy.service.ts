import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  // FALTA LA PARTE DE LA API - REVISAR EL MODELO CART que es la estructura de MOONGOSE

  constructor(private http: HttpClient) { 

  }

  // Metodo para insertar la compra en mongoDB
  createBuy(buyData: any): Observable<any> {
    return this.http.post<any>(`${apiUrls.buyServiceApi}buyCart`, buyData);
  }

  // Método para obtener todas las compras del usuario por su _idClient
  getUserCarts(_idClient: string): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrls.buyServiceApi}/getUserCarts/${_idClient}`);
  }

  // Método para obtener el carrito de todos los usuarios
  getAllCarts() {
    return this.http.get<any>(`${apiUrls.buyServiceApi}/getAllCarts`);
  }

  // Metodo para obtener un carrito en especifico
  getCart(_id: string): Observable<any> {
    return this.http.get<any>(`${apiUrls.buyServiceApi}/getCart/${_id}`);
  }

  // Metodo para actualizar un carrito
  updateCart(cart: Cart): Observable<any> {
    return this.http.put<any>(`${apiUrls.buyServiceApi}/updateCart/${cart._id}`, cart);
  }

  // Metodo para elimianr un carrito
  deleteCart(_id: string): Observable <void> {
    return this.http.delete<any>(`${apiUrls.buyServiceApi}/deleteCart/${_id}`)
  }

}
