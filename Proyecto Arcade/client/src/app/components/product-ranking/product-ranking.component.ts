import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyService } from 'src/app/services/buy.service';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-ranking.component.html',
  styleUrls: ['./product-ranking.component.css']
})
export class ProductRankingComponent {

  purchases: {product: String, quantity: number}[] = [];
  purchase: Cart[] = []

  constructor(public buyService: BuyService){
    // Estraigo todas las compras
    this.buyService.getAllCarts().subscribe(res => {
      this.purchase = res as Cart[]
      // Ahora recorro las compras
      this.purchase.forEach(cart => {
        // Recorro el array de productos de cada compra
        cart.products.forEach(productoTo =>{
          const {nameProduct, amount} = productoTo

          const purchaseTotal = this.purchases.find(pro => pro.product == productoTo.nameProduct)

          // Si existe ese producto dentro de purchases lo incremento y sino no añado y le asigno la cantidad
          if(purchaseTotal){
            purchaseTotal.quantity += amount
          }
          else 
            this.purchases.push({product: productoTo.nameProduct, quantity: amount})
            this.purchases.sort((a, b) => b.quantity - a.quantity); // Ordeno de mayor cantidad a menos
        })
        
      })
    });
  }

}
