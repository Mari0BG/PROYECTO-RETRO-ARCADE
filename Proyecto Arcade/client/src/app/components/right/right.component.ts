import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-right',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent {

  productos: Array<Cart> = [];

  constructor(){
    this.productos.push(new Cart());
    this.productos[0]._id = "";
    this.productos[0]._idProduct = "Producto 1";
    this.productos[0]._idClient = "";
    this.productos[0].description = "Muy guapo";
    this.productos[0].price = 550;
    this.productos[0].amount = 3;
    this.productos[0].nameProduct = "Producto 1";
    this.productos[0].imageProduct = "https://pm1.aminoapps.com/7706/0369015221a1b48e3e6b0440906e82d1abc9dd49r1-430-512v2_uhq.jpg";
    this.productos[0].category_id = "655ba587ce5c90942dd4c9a1";

    this.productos.push(new Cart());
    this.productos[1]._id = "";
    this.productos[1]._idProduct = "";
    this.productos[1]._idClient = "";
    this.productos[1].description = "Muy guapo";
    this.productos[1].price = 333;
    this.productos[1].amount = 3;
    this.productos[1].nameProduct = "Producto 2";
    this.productos[1].imageProduct = "https://pm1.aminoapps.com/7706/0369015221a1b48e3e6b0440906e82d1abc9dd49r1-430-512v2_uhq.jpg";
    this.productos[1].category_id = "655ba587ce5c90942dd4c9a1";
    
    this.productos.push(new Cart());
    this.productos[2]._id = "";
    this.productos[2]._idProduct = "";
    this.productos[2]._idClient = "";
    this.productos[2].description = "Muy guapo";
    this.productos[2].price = 333;
    this.productos[2].amount = 3;
    this.productos[2].nameProduct = "Producto 2";
    this.productos[2].imageProduct = "https://pm1.aminoapps.com/7706/0369015221a1b48e3e6b0440906e82d1abc9dd49r1-430-512v2_uhq.jpg";
    this.productos[2].category_id = "655ba587ce5c90942dd4c9a1";
  }
}
