import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export default class ProductDisplayComponent {

  comentarios = [
    { usuario: 'Usuario  1', texto: 'Excelente producto, recomendado.' },
    { usuario: 'Usuario  2', texto: 'Muy buena calidad, lo recomiendo.' }
  ];

  constructor(public ratingService: RatingService, public userService: UserService, public cartService: CartService, public router: Router){

  }

  prod= new Product
  ngOnInit(): void {
    // Recuperar la cadena JSON del localStorage
    let objetoComoCadenaRecuperado = localStorage.getItem('productDisplay');

    // Verificar si el valor es null antes de parsear
    let objetoRecuperado;
    if (objetoComoCadenaRecuperado !== null) {
      // Convertir la cadena JSON de nuevo a un objeto
      objetoRecuperado = JSON.parse(objetoComoCadenaRecuperado);
    } else {
      // Manejar el caso en que el valor es null, por ejemplo, asignar un valor predeterminado
      objetoRecuperado = {}; // o cualquier valor predeterminado que desees
    }

    // Ahora puedes usar objetoRecuperado como un objeto
    console.log(objetoRecuperado);
    this.prod=objetoRecuperado
    this.prodRatings()
  }

  ratingProd: Rating[]=[]
  cosa={
    wea1:"a"
  }
  prodRatings(){
    const uid = this.prod._id?.toString()
    if(uid){

      this.ratingService.getAllRatingsByProductId(uid).subscribe(res=>{
        const ratingProd = res as Rating[]
        this.ratingProd=ratingProd
        console.log(this.ratingProd)
      })
    }
  }


getStarClasses(rating: string): string[] {
  const ratingNumber = parseInt(rating,  10);
  const starClasses = [];
  for (let i =  0; i <  5; i++) {
    if (i < ratingNumber) {
      starClasses.push('fa fa-star');
    } else {
      starClasses.push('fa fa-star-o');
    }
  }
  return starClasses;
}

AddProductToCart(product: Product){
  this.cartService.addNewProduct(product);
  this.router.navigate(['home'])
}

}
