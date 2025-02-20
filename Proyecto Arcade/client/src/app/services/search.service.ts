import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Observable para buscar productos en C.Center desde Header a traves del nombre

  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable(); // Permito poder suscribirse a el

  // Metodo para pasar la cadena a buscar
  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

}
