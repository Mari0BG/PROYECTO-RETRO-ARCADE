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
  isAdmin?: boolean;

  logout() {
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_role")
    localStorage.clear()  // BORRA TODO EL LOCAL STORAGE
    this.authService.isLoggedIn$.next(false)
    this.authService.setAdminStatus(false);  // Establecer el estado de administrador como falso
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
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }
  
  searchQuery: string = '';
  // Metodo que al pulsar el boton buscar llama al metodo del observable pasandole la cadena que tendra 
  // que contener el producto para mostrarse en el center
  updateSearchQuery(): void {
    this.searchService.updateSearchQuery(this.searchQuery);
  }

  // Metodo que solo funciona cuando el buscador esta vacio, hace que carguen todos los productos en el center
  updateSearchQueryEmpty(): void {
    if (this.searchQuery == "")
      this.searchService.updateSearchQuery(this.searchQuery);
  }
}
