import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../models/provider';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providersSelected!: Provider;
  providers: Provider[] = [];

  constructor(private http: HttpClient) { }

  // Metodo para traer a un proveedor especifico
  getProviderById(userId: String){
    return this.http.get<Provider>(`${apiUrls.providerServiceApi}/${userId}`);
  }

  // Metodo para traer todos proveedores
  getAllProviders(){
    return this.http.get<Provider[]>(`${apiUrls.providerServiceApi}getAll`);
  }

  // Metodo para crear proveedor
  createProvider(provider: Provider) {
    return this.http.post(`${apiUrls.providerServiceApi}create`, provider);
  }

  // Metodo para actualizar proveedor
  updateProvider(provider: Provider){
    return this.http.put(`${apiUrls.providerServiceApi}${provider._id}`, provider);
  }

  // Metodo para eliminar proveedor
  deleteProvider(providerId: String) {
    return this.http.delete(`${apiUrls.providerServiceApi}${providerId}`);
  }
}
