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
    return this.http.post<any>(`${apiUrls.buyServiceApi}create`, buyData);
  }

  // Faltan los metodos para eliminar carrito, coger carrito del cliente a traves de ID y mostrarlo
}
