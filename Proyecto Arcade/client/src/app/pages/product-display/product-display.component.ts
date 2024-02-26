import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product';

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
  constructor(){

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
  }

}
