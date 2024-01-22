import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyService } from 'src/app/services/buy.service';

@Component({
  selector: 'app-my-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export default class MyPurchasesComponent {
  username = localStorage.getItem("user_name")

  purchases: any[] = [];
  // Para establecer la imagen en localStorage

// Para obtener la imagen de localStorage
 userImg = localStorage.getItem('user_img');


  constructor(private buyService: BuyService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.buyService.getUserCarts(userId).subscribe(
        (userCarts) => {
          this.purchases = userCarts;
          this.calculateMoneySpent();
          this.calculateTotalQuantity2()
          console.log(this.purchases);
        },
        (error) => {
          console.error('Error al obtener las compras del usuario:', error);
        }
      );
    }
  }

  // MEtodo para calcular el total gastado por compra
  calculateTotal(products: any[]): number {
    return products.reduce((total, product) => total + product.amount * product.price, 0);
  }

  // Metodo que obtiene el total gastado entre todas las compras y lo retorna
  calculateTotalSpend(purchases: any[]): number {
    // Devuelvo el total
    // Recorro todas las compras
    return purchases.reduce((total, purchase) => {
      // Por cada compra cojo el array de productos que tiene
      const products: any[] = purchase.products; 

      // Ahora recorro el array de products almacenando el total gastado en cada compra
      const purchaseTotal = products.reduce((purchaseTotal, product) => {
        // Si el producto tiene cantidad y precio devuelvo el total de ese producto
        if (product.amount !== undefined && product.price !== undefined) {
          return purchaseTotal + product.amount * product.price;
        } 
        else {
          console.warn('Advertencia: amount o price no están definidos para un producto.');
          return purchaseTotal;
        }
      }, 0);

      return total + purchaseTotal;
    }, 0);
  }
  totalQuantity: number = 0; 
  total: number = 0

  // Metodo para recoger el total gastado
  calculateMoneySpent() {
    this.total = this.calculateTotalSpend(this.purchases)
  }

  calculateTotalQuantity2() {
    this.totalQuantity = this.calculateTotalQuantity(this.purchases);
  }

  calculateTotalQuantity(purchases: any[]): number {
    return purchases.reduce((total, purchase) => {
      const products: any[] = purchase.products;
      const purchaseQuantity = products.reduce((purchaseQuantity, product) => {
        if (product.amount !== undefined) {
          return purchaseQuantity + product.amount;
        } else {
          console.warn('Advertencia: amount no está definido para un producto.');
          return purchaseQuantity;
        }
      }, 0);
      return total + purchaseQuantity;
    }, 0);
  }
}
