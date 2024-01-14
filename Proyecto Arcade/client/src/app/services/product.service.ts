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

  showProduct(product: Product){
    return this.http.get(`${apiUrls.productServiceApi}get/${product._id}`);
  }

  showProducts(){
    return this.http.get(`${apiUrls.productServiceApi}getAll`);
  }

  createProduct(product: Product){
    return this.http.post(`${apiUrls.productServiceApi}create`, product);
  }

  updateProduct(product: Product){
    return this.http.put(`${apiUrls.productServiceApi}update/${product._id}`, product);
  }

  deleteProduct(_id: String){
    return this.http.delete(`${apiUrls.productServiceApi}delete/${_id}`);
  }

  // Metodo para descontar stock de producto
  updateProductStock(product: Product, quantity: number) {
    product.stock = product.stock-quantity
    return this.http.put(`${apiUrls.productServiceApi}updateStock/${product._id}`, product);
  }
}
