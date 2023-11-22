import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  productSelected: Product;
  products: Product[];
  readonly URL = 'http://localhost:8800/api/product';

  constructor(private http: HttpClient) {
    this.productSelected = new Product();
    this.products = [];
  }

  showProduct(product: Product){
    return this.http.get(this.URL + `/get/${product._id}`);
  }

  showProducts(){
    return this.http.get(this.URL + `/getAll`);
  }

  createProduct(product: Product){
    return this.http.post(this.URL + `/create`, Product);
  }

  updateProduct(product: Product){
    return this.http.put(this.URL + `/update/${product._id}`, product);
  }

  deleteProduct(_id: String){
    return this.http.delete(this.URL + `/delete/${_id}`);
  }
}
