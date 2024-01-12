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

  ngOnInit(): void {
    this.obtainProducts();
    // Aqui lo del observable, me suscribo para obtener el nombre del producto que quiero buscar
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }

  shouldDisplayProduct(producto: any): String{
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

  searchQuery = ""

  // Filtro los productos dependiendo el filtro que haya indicado
  get sortedProducts() {
    // Hago un array con los productos filtrando los que no esten candelados y los que el nombre coincida con lo que le paso desde el header
    let filteredProducts = this.activeProducts.filter(product => product.cancelproduct !== true
      && product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    
    // Aplico los filtros de ordenacion, filtrando dependiendo lo que le indique
    if (this.selectedSort === 'name') {
      return filteredProducts.sort((a, b) => a.name.toString().localeCompare(b.name.toString()));
    } 
    else if (this.selectedSort === 'priceAlto') {
      return filteredProducts.sort((a, b) => b.price - a.price);
    } 
    else if (this.selectedSort === 'priceBajo') {
      return filteredProducts.sort((a, b) => a.price - b.price);
    } 
    else if (this.selectedSort === 'stockmayor') {
      return filteredProducts.sort((a, b) => b.stock - a.stock);
    } 
    else if (this.selectedSort === 'stockmenos') {
      return filteredProducts.sort((a, b) => a.stock - b.stock);
    } 
    else {
      // Aqui devuelvo el orden por defecto de los productos
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
