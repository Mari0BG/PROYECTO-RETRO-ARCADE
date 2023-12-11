import { Component, Input } from '@angular/core';
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

  @Input() idCategory: String;

  constructor(public productService: ProductService) {
    this.idCategory = "655abbdba628f0ea1f33cd89"; 
  }
  shuldDisplayProduct(producto: any): String{
    return(this.idCategory== producto.category_id || !this.idCategory || this.idCategory == "655abbdba628f0ea1f33cd89")? 'block' : 'none'
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
