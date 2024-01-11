import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private searchService: SearchService ) { }

  isLoggedIn: boolean = false
  isAdmin: boolean = false

  logout() {
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_role")
    localStorage.clear()  // BORRA TODO EL LOCAL STORAGE
    this.authService.isLoggedIn$.next(false)
    this.authService.isAdmin$.next(false)
  }

  adminControl() {
    this.router.navigate(['admin-control'])
  }

  miscompras(){
    this.router.navigate(['my-purchases'])
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = this.authService.isLoggedIn();
      
    });
  
    this.authService.isAdmin$.subscribe(res => {
      this.isAdmin = this.authService.isAdmin();
      console.log(this.isAdmin); // Agregar esta línea para depurar
    });
  }
  
  searchQuery: string = '';
  // Logica que recoge el nombre que quiero buscar de los productos
  updateSearchQuery1(): void {
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  updateSearchQuery(event: any): void {
    this.searchQuery = event.target.value;
    this.searchService.updateSearchQuery(this.searchQuery);
  }
  
}
