import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductRankingComponent } from '../product-ranking/product-ranking.component';
@Component({
  selector: 'app-left',
  standalone: true,
  imports: [CommonModule, CategoriesComponent, ProductRankingComponent],
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})

export class LeftComponent {
  @Output() categoriaEnviada = new EventEmitter<string>();
  public idCate: String;

  constructor(){
    this.idCate = '';
  }

  RecibirCategoria(id: any){
    //this.idCategory = id;
    this.categoriaEnviada.emit(id);
  }
  
}
