import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class SubirIMGService {
  selectedFile: File | undefined = undefined; // Inicializa selectedFile con undefined

  constructor(private http: HttpClient) { }
  
  // Metodo para guardar imagen dentro de imagenes
  uploadImg(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile instanceof File) { 
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      return this.http.post(`${apiUrls.uploadServiceApi}create`, formData);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
      return null;
    }
  }
}
