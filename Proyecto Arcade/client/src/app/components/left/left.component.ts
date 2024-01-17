import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-left',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})

export class LeftComponent {

  
}
