import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { BuyService } from 'src/app/services/buy.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export default class CartComponent {
  products: { product: Product, quantity: number}[] = [];
  total: number = 0;
  cart: Cart = new Cart();

  // Mostrar MSG Pop-Up
  isPopupPurchase = false;

  constructor(public cartService: CartService, public buyService: BuyService, public authService: AuthService, public productService: ProductService) {
    
  }

// Metodo para realizar la compra
// Dentro de tu método BuyCart()
  BuyCart() {
    let token = this.authService.getUserId();
    console.log(this.products);
  
    if (token != null && this.total > 0) {
      const idUsuario: string = token;
  
      // Transformar la estructura de products
      const transformedProducts = this.products.map(cartProduct => ({
        _idProduct: cartProduct.product._id,
        price: cartProduct.product.price,
        amount: cartProduct.quantity, // Utilizar quantity en amount
        nameProduct: cartProduct.product.name,
        imageProduct: cartProduct.product.image,
        category_id: cartProduct.product.category_id[0], // Tomar el primer elemento del array
      }));
  
      const buyData = {
        _idClient: idUsuario,
        products: transformedProducts,
      };
  
      this.buyService.createBuy(buyData).subscribe(
        (response) => {
          this.isPopupPurchase = true;
          console.log('Compra realizada con éxito:', response);
          this.updateStockAfterPurchase(transformedProducts);
          this.ClearCart();
        },
        (error) => {
          console.error('Error al realizar la compra:', error);
        }
      );
    } 
    else if (token == null) {
      alert("Usuario no logeado. Ingrese antes de realizar compra");
    }
    else {
      alert("Error. El carrito está vacío")
    }
  }

  // Metodo para descontar stock de los productos
  private updateStockAfterPurchase(products: any[]): void {
    for (const productData of products) {
      const productId = productData._idProduct;
      const amount = productData.amount;
      console.log("voy "+productId+" can "+amount)
      // Llamada a la API para actualizar el stock
      const product: Product = this.getProductById(productId);
      this.productService.updateProductStock(product, amount).subscribe(
        () => {
          console.log(`Stock actualizado para ${productData.nameProduct}`);
        },
        (error) => {
          console.error(`Error al actualizar el stock para ${productData.nameProduct}:`, error);
        }
      );
    }
  }

  private getProductById(productId: string) {
    const foundProduct = this.products.find(productData => productData.product._id === productId);

    if (foundProduct) {
      return foundProduct.product;
    } else {
      throw new Error(`Producto con ID ${productId} no encontrado`);
    }
  }

  // Me suscribo al observable para recibir los productos del carrito | cualquier cambio se refleja automaticamente
  ngOnInit(): void {
    this.cartService.products.subscribe(products => {
      this.products=products;
      this.total = this.cartService.total;
    });
  }

  // Aumentar o disminutir cantidad de un producto
  ModifyAmount(indice: number, operator: String){
    this.cartService.ModifyQuantity(indice, operator);
  }

  // Metodo para eliminar un producto del carrito
  DeleteProduct(indice: number){
    this.cartService.deleteProduct(indice);
  }

  // Metodo para vaciar carrito 
  ClearCart(){
    this.cartService.clearCart();
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

  // Cerrar popup y recargar
  ClosePopUp(){
    this.isPopupPurchase = false
    // Recargar la pagina home
    window.location.reload();
  }
  
}
