import { Injectable, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartChanged = new EventEmitter<Cart[]>();
  private cart: Product[] = [];
  private products: Cart[] = [];

  AddProductToCart(product: Product) {
    this.cart.push(product);

    this.cartChanged.emit([...this.cart]);
  }

  getCart(): Product[] {
    return this.cart;
  }
}
