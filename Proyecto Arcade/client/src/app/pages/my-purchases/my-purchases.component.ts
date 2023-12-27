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
          console.log(this.purchases);
        },
        (error) => {
          console.error('Error al obtener las compras del usuario:', error);
        }
      );
    }
  }

  calculateTotal(products: any[]): number {
    return products.reduce((total, product) => total + product.amount * product.price, 0);
  }
}
