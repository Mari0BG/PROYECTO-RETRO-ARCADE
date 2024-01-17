import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { BuyService } from 'src/app/services/buy.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import CartComponent from '../cart/cart.component';

@Component({
  selector: 'app-right',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent {



}