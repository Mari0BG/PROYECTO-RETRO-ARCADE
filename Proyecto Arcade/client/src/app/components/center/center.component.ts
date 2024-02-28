import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { SearchService } from 'src/app/services/search.service';
import { ElementSchemaRegistry } from '@angular/compiler';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';
import { of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})

export default class CenterComponent {

  @Input() idCategory: String;

  constructor(public router: Router,public ratingService: RatingService,public productService: ProductService, private cartService: CartService, private searchService: SearchService) {
    this.idCategory = "655abbdba628f0ea1f33cd89";

  }
  ratings: Rating[] = [];
  loadRatings() {
    this.ratingService.getAllRatings().subscribe((res) => {
      this.ratings = res as Rating[];
    });
  }

  ngOnInit(): void {
    this.obtainProducts();
    // Aqui lo del observable, me suscribo para obtener el nombre del producto que quiero buscar
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
    this.loadRatings();
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

  displayProduct(product: Product){
    let subirprod = JSON.stringify(product);
    localStorage.setItem('productDisplay', subirprod)
    this.router.navigate(['product-display'])
  }

  //MODAL RATING
  isRatingModalOpen:boolean=false
  rating="5"
  comment=""
  productForRating?: Product
  ratingAmount=""

  totalAmount(product: Product) {
    let total = 0;

    this.ratings.forEach((res2) => {
      if (res2._idProduct === product._id) {
        total++;
      }
    });

    return "- "+total+" valoraciones";
  }

  totalAmount2(producto: any): number {
    const productRatings = this.ratings.filter(rating => rating._idProduct === producto._id);
    const totalRatings = productRatings.length;

    if (totalRatings === 0) {
      return 0;
    }

    const totalStars = productRatings.reduce((accumulator, currentRating) => accumulator + parseFloat(currentRating.rating.toString()), 0);
    const average = totalStars / totalRatings;

    return average;
  }

  getStarIcon(rating: number, index: number): string {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);

    if (index < fullStars) {
      return 'fa fa-star';
    } else if (index === fullStars && halfStars === 1) {
      return 'fa fa-star-half-o';
    } else {
      return 'fa fa-star-o';
    }
  }

  // Método para crear un array de índices con la longitud deseada
  getRange(length: number): any[] {
    return Array.from({ length }, (_, index) => index);
  }

  openRatingModal(product: Product){
    this.productForRating=product
    console.log(this.productForRating)

    const uid = localStorage.getItem("user_id");
    if(uid){
      this.ratingService.getAllRatingsByUserId(uid).subscribe(res=>{
        const userRating = res as Rating[]
        userRating.forEach(res2=>{
          if(res2._idProduct==product._id){
            this.rating=res2.rating.toString()
            this.comment=res2.coment.toString()
          }
        })
      })

    }

    this.isRatingModalOpen=true
  }
  closeRatingModal(){
    this.rating="5"
    this.comment=""
    this.productForRating= new Product
    this.isRatingModalOpen=false
    window.location.reload();
  }
  saveRating() {
    const pid = this.productForRating?._id; // Esto tiene el id del producto
    const uid = localStorage.getItem("user_id"); // Esto tiene el id del usuario
    const username = localStorage.getItem("user_name"); // Nombre de usuario
    const userimg = localStorage.getItem("user_img"); // URL de la imagen del usuario
  
    // Verificar que pid, uid, username y userimg no sean nulos o indefinidos
    if (pid && uid && username && userimg) {
      // Verificar si el usuario ya ha calificado el producto
      this.ratingService.getAllRatingsByUserId(uid).subscribe(
        (userRatings: Rating[]) => {
          const existingRating = userRatings.find(rating => rating._idProduct === pid);
  
          if (existingRating) {
            console.log(`El usuario ya ha calificado el producto con _idProduct: ${pid}`);
            // Actualizar el rating existente en lugar de crear uno nuevo
  
            const updatedRating: Rating = {
              _id: existingRating._id,
              _idProduct: existingRating._idProduct,
              _idUser: existingRating._idUser,
              rating: this.rating.toString(),
              coment: this.comment.toString(),
              username: username, // Agregar username
              userimg: userimg // Agregar userimg
            };
  
            this.ratingService.updateRating(updatedRating).subscribe(
              (updatedRating: Rating) => {
                console.log("Rating actualizado:", updatedRating);
              },
              (error: any) => {
                console.error("Error al actualizar el rating:", error);
              }
            );
            this.closeRatingModal();
          } else {
            // Crear un nuevo rating
            const newRating: Rating = {
              _idProduct: pid,
              _idUser: uid,
              rating: this.rating.toString(),
              coment: this.comment,
              username: username, // Agregar username
              userimg: userimg // Agregar userimg
            };
  
            // Guardar el nuevo rating en la base de datos
            this.ratingService.createRating(newRating).subscribe(
              (createdRating: Rating) => {
                console.log("Nuevo rating creado:", createdRating);
              },
              (error: any) => {
                console.error("Error al crear el nuevo rating:", error);
              }
            );
            this.closeRatingModal();
          }
        },
        (error: any) => {
          console.error("Error al obtener los ratings del usuario:", error);
          this.closeRatingModal();
        }
      );
    } else {
      console.error("Error: pid, uid, username o userimg es nulo o indefinido.");
    }
  }
  



}
