import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-right',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent {

  products: Array<Cart> = [];
  cart: Product[] = [];

  constructor(public cartService: CartService) {
    
  }


  // Aumentar o disminutir cantidad de un producto
  ModifyAmount(cartProduct: Cart, operator: String){
    if(operator == "+"){
      cartProduct.amount = cartProduct.amount + 1;
    }
    else {
      cartProduct.amount = cartProduct.amount - 1;
      // Compruebo si cantidad es menor que 1 y si es asi elimino el producto del carrito
      if(cartProduct.amount < 1){
        this.products.splice(this.products.indexOf(cartProduct), 1);
      }
    }

  }

  ngOnInit() {
    this.cartService.cartChanged.subscribe((cart) => {
      this.cart = cart;
    });
  }

  // Metodo para eliminar un producto del carrito
  DeleteProduct(cartProduct: Cart){
    this.products.splice(this.products.indexOf(cartProduct), 1);
  }

  // Metodo para vaciar carrito 
  ClearCart(){
    this.products = [];
  }

  // Metodo para mostrar u ocultar carrito
  MostrarOcultar(opc: String) {
    let opc1 = document.getElementById(opc+"");
    if(opc1!=null) {
      if(opc1.style.display=="block"){
        opc1.style.display="none";
      }
      else {
        opc1.style.display="block";
      }
    }
  }
}