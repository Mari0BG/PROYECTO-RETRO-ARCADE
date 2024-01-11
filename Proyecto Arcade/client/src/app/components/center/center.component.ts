import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';
@Component({
  selector: 'app-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})

export default class CenterComponent {

  @Input() idCategory: String;

  constructor(public productService: ProductService, private cartService: CartService, private searchService: SearchService) {
    this.idCategory = "655abbdba628f0ea1f33cd89"; 
    
  }

  

  shuldDisplayProduct(producto: any): String{
    return(this.idCategory== producto.category_id || !this.idCategory || this.idCategory == "655abbdba628f0ea1f33cd89")? 'block' : 'none'
  }

  obtainProducts() {
    this.productService.showProducts()
    .subscribe(res => {
      this.productService.products = res as Product[];
      console.log(res);
    })
  }


  selectedSort: string = 'default'; 

  // Metodo para cambiar por lo que voy a filtrar
  changeSort(sortOption: string): void {
    this.selectedSort = sortOption;
  }

  ngOnInit(): void {
    
    this.obtainProducts();
    // Aqui lo del observable
    this.cartService.products.subscribe(products => {
      this.products=products;
      this.total = this.cartService.total;
    });
    this.searchQuerySubscription = this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.searchProducts();
    });
  }

  searchQuery = ""
  // Filtro los productos dependiendo el filtro que haya indicado
  get sortedProducts() {
    let filteredProducts = this.activeProducts.filter(product => product.cancelproduct !== true
      && product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

    if (this.selectedSort === 'name') {
      return filteredProducts.sort((a, b) => a.name.toString().localeCompare(b.name.toString()));
    } 
    else if (this.selectedSort === 'priceAlto') {
      return filteredProducts.sort((a, b) => b.price - a.price);
    } 
    else if (this.selectedSort === 'priceBajo') {
      return filteredProducts.sort((a, b) => a.price - b.price);
    } 
    else if (this.selectedSort === 'stock') {
      return filteredProducts.sort((a, b) => a.stock - b.stock);
    } 
    else {
      // Orden por defecto o cualquier otra lógica de ordenación
      return filteredProducts;
    }
  }

  
  // Filtro por los que no esten conectados para mostrarlos
  get activeProducts() {
    return this.productService.products.filter(product => product.cancelproduct !== true);
  }

  

  // Metodo para aniadir un producto al carrito a traves de añadirlo en el observable
  AddProductToCart(product: Product){
    this.cartService.addNewProduct(product);
  }

}
