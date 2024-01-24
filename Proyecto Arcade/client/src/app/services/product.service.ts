import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productSelected: Product;
  products: Product[];

  constructor(private http: HttpClient) {
    this.productSelected = new Product();
    this.products = [];
  }

  // Metodo para mostrar un producto
  showProduct(product: Product){
    return this.http.get(`${apiUrls.productServiceApi}get/${product._id}`);
  }

  // Metodo para mostrar todos los productos
  showProducts(){
    return this.http.get(`${apiUrls.productServiceApi}getAll`);
  }

  // Metodo para crear producto
  createProduct(product: Product){
    return this.http.post(`${apiUrls.productServiceApi}create`, product);
  }

  // Metodo para actualizar producto
  updateProduct(product: Product){
    return this.http.put(`${apiUrls.productServiceApi}update/${product._id}`, product);
  }

  // Metodo para borrar producto
  deleteProduct(_id: String){
    return this.http.delete(`${apiUrls.productServiceApi}delete/${_id}`);
  }

  // Metodo para descontar stock de producto
  updateProductStock(product: Product, quantity: number) {
    product.stock = product.stock-quantity
    return this.http.put(`${apiUrls.productServiceApi}updateStock/${product._id}`, product);
  }
}
