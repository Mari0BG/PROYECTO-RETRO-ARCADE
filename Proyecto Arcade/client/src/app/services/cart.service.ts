import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: { product: Product, quantity: number}[] = [];
  total: number = 0;

  // Aqui si queremos que los productos se muestre uno encima del otro en vez de agrupados quitamos quantity y ponemos Product() y en los demas lados igual
  _products: BehaviorSubject<{ product: Product, quantity: number}[]> = new BehaviorSubject<{ product: Product, quantity: number}[]>([]);

  // Da la oportunidad de suscribirse al observable al llamarlo desde otro componente
  get products() {
    return this._products.asObservable();
  }

  addNewProduct(product: Product) {
    // Si el producto ya se encuentra en el carrito compruebo que cantidad sea menor al stock y si es asi lo incremento y sino muestro alert
    // Si producto no se encuentra en el carrito lo agrego y le pongo en cantidad 1
    // Actualizo el total del coste y actualizo el carrito
    const existingProduct = this.cartProducts.find((productFind) => productFind.product._id === product._id);
    if (existingProduct) { 
      if (existingProduct.quantity < product.stock) {
        existingProduct.quantity += 1;
      } 
      else {
        alert("No hay suficiente stock");
      }
    } 
    else { 
      this.cartProducts.push({ product, quantity: 1 });
    }
    this.updateTotal();
    this._products.next(this.cartProducts);
  }

  // Elimino el producto del array que este en el indice pasado y digo que se ha actualizado el carrito y le paso el nuevo array
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.updateTotal();
    this._products.next(this.cartProducts);
  }

  // Metodo para vaciar el carrito y actualizar el total
  clearCart(){
    this.cartProducts = [];
    this.updateTotal();
    this._products.next(this.cartProducts);
  }

  // Metodo para modificar la cantidad de un producto
  ModifyQuantity(index: number, operator: String){
    // Accedo al producto del array a traves del indice pasado
    // + -> Si cantidad es menor a stock incremento y sino muestro alert
    // - -> Descuento en 1 la cantidad y si es menor a 1 elimino el producto del carrito
    const product = this.cartProducts[index];
    if(operator == "+") {
      if (product.quantity < product.product.stock) {
        product.quantity += 1;
        this.updateTotal();
        this._products.next(this.cartProducts);
      } 
      else {
        alert("No hay suficiente stock");
      }
    }
    else {
      product.quantity -= 1;
      if(product.quantity < 1){
        this.cartProducts.splice(index, 1);
      }
      this.updateTotal();
      this._products.next(this.cartProducts);
    }
  }

  // Metodo para actualizar el total del carrito
  // Primer parametro es la cantidad anterior y el segundo es la nueva cantidad
  // Empieza en 0 y se va sumando todos los precios de los productos del carrito
  private updateTotal() {
    this.total = this.cartProducts.reduce((acc, val) => acc + val.product.price * val.quantity, 0);
  }
}
