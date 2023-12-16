import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-right',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent {

  products: Array<Cart> = [];

  constructor(){
    this.products.push(new Cart());
    this.products[0]._id = "";
    this.products[0]._idProduct = "Producto 1";
    this.products[0]._idClient = "";
    this.products[0].description = "Muy guapo";
    this.products[0].price = 550;
    this.products[0].amount = 3;
    this.products[0].nameProduct = "Producto 1";
    this.products[0].imageProduct = "https://pm1.aminoapps.com/7706/0369015221a1b48e3e6b0440906e82d1abc9dd49r1-430-512v2_uhq.jpg";
    this.products[0].category_id = "655ba587ce5c90942dd4c9a1";

    this.products.push(new Cart());
    this.products[1]._id = "";
    this.products[1]._idProduct = "";
    this.products[1]._idClient = "";
    this.products[1].description = "Muy guapo";
    this.products[1].price = 333;
    this.products[1].amount = 3;
    this.products[1].nameProduct = "Producto 2";
    this.products[1].imageProduct = "https://pm1.aminoapps.com/7706/0369015221a1b48e3e6b0440906e82d1abc9dd49r1-430-512v2_uhq.jpg";
    this.products[1].category_id = "655ba587ce5c90942dd4c9a1";
    
    this.products.push(new Cart());
    this.products[2]._id = "";
    this.products[2]._idProduct = "";
    this.products[2]._idClient = "";
    this.products[2].description = "Muy guapo";
    this.products[2].price = 333;
    this.products[2].amount = 3;
    this.products[2].nameProduct = "Producto 2";
    this.products[2].imageProduct = "https://pm1.aminoapps.com/7706/0369015221a1b48e3e6b0440906e82d1abc9dd49r1-430-512v2_uhq.jpg";
    this.products[2].category_id = "655ba587ce5c90942dd4c9a1";
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