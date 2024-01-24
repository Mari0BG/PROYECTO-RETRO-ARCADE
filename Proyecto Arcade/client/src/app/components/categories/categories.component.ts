import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  
  @Output() categoriaEnviada = new EventEmitter<string>();
  totalCategory: { categoryId: String, categoryName: String, quantity: number}[] = [];

  constructor(public categoryService: CategoryService, public productService: ProductService){
    
  }

  PasarCategoria(_id: any){
    this.categoriaEnviada.emit(_id);
  }

  obtaingCategories() {
    // Obtengo categorias
    this.categoryService.showCategories().subscribe(res => {
      this.categoryService.categories = res as Category[];
      // Obtengo todos los productos
      this.productService.showProducts().subscribe(res => {
        this.productService.products = res as Product[];
        // Recorro cada categoria
        this.categoryService.categories.forEach( category => {
          // Si la categoria es todos asigno a contador el total de productos, sino es todos compruebo los productos que hay de la categoria que toca
          const contador = category.name.toLowerCase() === 'todos'
          ? this.productService.products.length  
          : this.productService.products.filter(product => product.category_id == category._id ).length; 
          // Añado al array los datos de la categoria y cantidad de productos por ella
          this.totalCategory.push({categoryId: category._id, categoryName: category.name, quantity: contador})
        })
      })
    })
  }

  ngOnInit(): void {
    this.obtaingCategories();
    
  }
}
