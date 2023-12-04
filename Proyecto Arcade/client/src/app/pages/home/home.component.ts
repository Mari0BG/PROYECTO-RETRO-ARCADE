import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import CenterComponent from 'src/app/components/center/center.component';
import { LeftComponent } from 'src/app/components/left/left.component';
import { RightComponent } from 'src/app/components/right/right.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CenterComponent, LeftComponent, RightComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export default class HomeComponent {

}
