import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from'src/app/services/product.service';

@Component({
  selector: 'app-center',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export default class CenterComponent {

  constructor(public productService: ProductService) {

  }

  obtainProducts() {
    this.productService.showProducts()
    .subscribe(res => {
      this.productService.products = res as Product[];
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.obtainProducts();
    
  }
}
