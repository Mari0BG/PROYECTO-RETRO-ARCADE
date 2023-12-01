import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-left',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})

export class LeftComponent {


  constructor(public categoryService: CategoryService){

  }

  obtaingCategories() {
    this.categoryService.showCategories()
    .subscribe(res => {
      this.categoryService.categories = res as Category[];
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.obtaingCategories();
  }
}
