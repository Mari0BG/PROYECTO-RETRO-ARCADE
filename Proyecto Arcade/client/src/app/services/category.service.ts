import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  categorySelected: Category;
  categories: Category[];

  constructor(private http: HttpClient) { 
    this.categorySelected = new Category();
    this.categories = [];
  }

  // Metodo para mostrar una categoria
  showCategory(category: Category){
    return this.http.get(`${apiUrls.categoryServiceApi}get/${category._id}`);
  }

  // Metodo para mostrar todas categorias
  showCategories() {
    return this.http.get(`${apiUrls.categoryServiceApi}getAll`);
  }

  // Metodo para crear categoria
  createCategory(category: Category) {
    return this.http.post(`${apiUrls.categoryServiceApi}create`, Category);
  }

  // Metodo para actualizar categoria
  updateCategory(category: Category) {
    return this.http.put(`${apiUrls.categoryServiceApi}update/${category._id}`, category);
  }

  // Metodo para eliminar categoria
  deleteCategory(_id: String) {
    return this.http.delete(`${apiUrls.categoryServiceApi}delete/${_id}`);
  }


}