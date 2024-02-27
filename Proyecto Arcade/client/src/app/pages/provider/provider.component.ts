import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProviderService } from 'src/app/services/provider.service';
import { Provider } from 'src/app/models/provider';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export default class ProviderComponent {
  // Simulación de datos de clientes y productos (reemplazar con datos reales)
  clientsData: any[] = [{ name: 'Cliente 1' }, { name: 'Cliente 2' }];
  productsData: any[] = [{ name: 'Producto 1' }, { name: 'Producto 2' }];
  
  // PROVIDER
  providerSearch: string = '';
  editedProviderName: string = '';
  editedProviderEmpresa: any;
  editedProviderAddress: any;
  editedProviderProfileImage: any;

  selectedProvider: any;
  selectedPass: any;
  selectedRol: any;
  isPopupDeleteProvider = false;
  isProviderCreated = false;
  isEditProviderModalOpen = false;

  // PRODUCT
  productSearch: string = '';
  filteredProducts: any[] = [];
  providersModal: any[] = [];
  
  categories: any[] = [];
  
  constructor(public productService: ProductService, public categoryService: CategoryService, public providerService: ProviderService, public sanitizer: DomSanitizer) {
    
   }
  
  ngOnInit(): void {
    this.obtainProducts();
    this.obtainProviders()
  }
  
  // Metodo para traer a todos los proveedores
  obtainProviders() {
    this.providerService.getAllProviders().subscribe((res: any) => {
      const providersData = res.data;
      this.providerService.providers = providersData as Provider[];
      console.log(providersData);
    });
  }

// Funciones CRUD para proveedores

  // Metodo para crear un proveedor
  addProvider(){
    this.isProviderCreated = true;
  }

  // Metodo para confirmar eliminacion proveedor
  deleteProvider(provider: any) {
    this.isPopupDeleteProvider = true;
    this.selectedProvider=provider._id;
  }
  
  // Eliminar un proveedor
  confirmDeleteProvider() {
    if (this.selectedProvider) {
      this.providerService.deleteProvider(this.selectedProvider)
      .subscribe(
        (result: any) => {
          console.log('Proveedor eliminado correctamente', result);
          this.obtainProviders(); // Actualizar la lista de proveedores después de la eliminación
        },
        (error: any) => {
          console.error('Error al eliminar el proveedor', error);
        }
      );
    }
    this.selectedProvider = null;
    this.isPopupDeleteProvider = false;
  }

  // Metodo para filtrar proveedor  
  /*get filteredProviders() {
    // Verificar si adminControlService.users es undefined o null antes de filtrar
      
      if (Array.isArray(this.providerService.providers)) {
        console.log("entro 1")
        // Ahora puedes usar el método filter
        return this.providerService.providers
      ? this.providerService.providers.filter(provider =>
        provider.name.toLowerCase().includes(this.providerSearch.toLowerCase())
        )
      : [];
    } else {
        console.log("entro 2")
        return [];
    }
  }*/
  get filteredProviders() {
    // Verificar si this.providerService.providers es un array antes de filtrar
    if (Array.isArray(this.providerService.providers)) {
        return this.providerService.providers.filter(provider =>
            provider.name.toLowerCase().includes(this.providerSearch.toLowerCase())
        );
    } else {
        // Si no es un array, devolver un array vacío
        return [];
    }
}

  // Establecer los valores iniciales del formulario modal según el proveedor seleccionado
  openEditProviderModal(provider: any) {
    this.selectedProvider = provider._id
    this.editedProviderName = provider.name;
    this.editedProviderEmpresa = provider.empresa;
    this.editedProviderAddress = provider.address;
    this.editedProviderProfileImage = provider.profileImage;
    console.log(provider)
  
    // Abrir el modal
    this.isEditProviderModalOpen = true;
  }

  // Guardar los cambios del proveedor
  saveEditedProvider() {
     // Verificar si el nombre del proveedor editado no está vacío
    if (this.editedProviderName.trim() === '') {
      console.error('El nombre del provedor no puede estar vacío.');
      return;
    }
  
    // Crear un objeto con los detalles editados del proveedor
    const editedProvider = {
      _id: this.selectedProvider, // Asegúrate de tener el ID del cliente seleccionado
      name: this.editedProviderName,
      empresa: this.editedProviderEmpresa,
      address: this.editedProviderAddress,
      profileImage: this.editedProviderProfileImage
    };
  
    // Llamar al servicio para editar el proveedor
    this.providerService.updateProvider(editedProvider)
      .subscribe(
        (result: any) => {
          console.log('Proveedor editado correctamente', result);
          this.obtainProviders(); 
          this.closeEditProviderModal(); 
        },
        (error: any) => {
          console.error('Error al editar el proveedor', error);
        }
      );
  }

  // 
  closeEditProviderModal() {
    // Restablecer las propiedades relacionadas con el modal y cerrar el modal
    this.isEditProviderModalOpen = false;
    this.editedProviderName = '';
    this.isProviderCreated = false;
    this.clearVariables();
    // Restablecer otras propiedades editadas si es necesario
  }

  createProviderName: string = '';
  createProviderEmpresa: string = '';
  createProviderDireccion: string = '';
  createProviderImageUrl: any;

  // Funcion para crear un proveedor
  saveProvider(){
  
    let ok = false
    // Verifico si tengo campos vacios o no
    ok = this.ComprobarCamposProveedor(); 
  
    if ( !ok ) {
      // Creo un objeto con los detalles del producto
      const createProvider: Provider = {
        name: this.createProviderName,
        empresa: this.createProviderEmpresa,
        address: this.createProviderDireccion,
        profileImage: this.createProviderImageUrl
      }
      if (this.existeProductoConNombre(this.createProductName)) {
        alert("El producto ya existe.")
      }
      else {
        console.log(createProvider)
        // Llamo al servicio para crear el producto
        this.providerService.createProvider(createProvider)
        .subscribe(
          (result:any) => {
            this.clearVariablesProvider();
            console.log('Proveedor creado correctamente', result);
            this.obtainProviders(); // Recargo la lista de productos
            this.closeEditProviderModal(); // Cierro el modal de crear producto
          },
          (error: any) => {
            console.error('Error al crear el proveedor', error);
        
            if (error instanceof HttpErrorResponse) {
              console.error('Detalles del error:', error);
            }
          }
        );
        this.isProviderCreated = false;
      }
    }
  }

  // Funcion que devuelve true y muestra alert con error en caso de haber un campo vacio y false si todo esta relleno
  ComprobarCamposProveedor(): boolean{
    if (
      this.createProviderName === undefined || this.createProviderName.trim() === '' ||
      this.createProviderEmpresa === undefined || this.createProviderEmpresa.trim() === '' ||
      this.createProviderDireccion === undefined || this.createProviderDireccion.trim() === '' ||
      this.createProviderImageUrl === undefined || this.createProviderImageUrl.trim() === ''
    )
    {
      alert("Por favor, rellene todos los campos.")
      return true;
    } 
    else {
      return false; 
    }
  }

  clearVariablesProvider(){
    this.createProviderName = "";
    this.createProviderEmpresa = "";
    this.createProviderDireccion = "";
    this.createProviderImageUrl = undefined;
  }

// *****************************
// ********   PRODUCT   ******** 
// *****************************


verProduct(provider: Provider){
  if (provider._id) {
    this.providerService.getProviderProducts(provider._id).subscribe((res) => {
      this.productService.products = res as Product[];
      this.filteredProducts = [...this.productService.products]; // Mover aquí
      console.log(res);
    });
    this.providerService.providersSelected = provider
  }
  else{
    console.error('El ID del proveedor es undefined.');
  }  
}

// Obtengo los productos
obtainProducts() {
  if(this.providerService.providersSelected && this.providerService.providersSelected._id){
    this.providerService.getProviderProducts(this.providerService.providersSelected._id).subscribe((res) => {
      this.productService.products = res as Product[];
      this.filteredProducts = [...this.productService.products]; // Mover aquí
      console.log("Respuesta: "+res);
    });
  }
}

// Para obtener los productos filtrados
filterProducts() {
  if (!this.productSearch) {
    // Si el término de búsqueda está vacío, restaura la lista completa
    this.filteredProducts = [...this.productService.products];
  } else {
    // Filtra los productos según el término de búsqueda
    this.filteredProducts = this.productService.products.filter((product) =>
      product.name.toLowerCase().includes(this.productSearch.toLowerCase())
    );
  }
}

// Funciones CRUD para productos
addProduct() {
  // Lógica para agregar un nuevo producto
  this.isProductCreated = true;
  this.obtainCategories();
  this.obtainProvidersModal();
}

editProduct(product: any) {
  // Lógica para editar el producto
  this.productService.productSelected = product;
}

deleteProduct(product: any) {
  // Lógica para eliminar el producto
  this.isPopupDelete = true;
  this.selectedProduct=product._id;
}

confirmDeleteProduct() {
  if(this.selectedProduct!=null) {
    this.productService.deleteProduct(this.selectedProduct)
    .subscribe(res => {
      this.obtainProducts();
    });
  }
  this.selectedProduct = null;
  this.isPopupDelete=false;
}

// Pop-up delete product
isPopupDelete = false;
isEditProductModalOpen = false;

selectedProduct: any;
editedProductName: string = '';
editedProductPrice: any;
editedProductDescription: string = '';
editedProductStock: any;
editedProductCategory: any;
editedProductProvider: any;
editedProductImageUrl: any;
editedProductcontpurchase: any;
editedProductCancel: any;

openEditProductModal(product: any) {
  this.obtainCategories();
  this.obtainProvidersModal();
  // Establecer los valores iniciales del formulario modal según el producto seleccionado
  this.selectedProduct = product._id
  this.editedProductName = product.name;
  this.editedProductPrice = product.price;
  this.editedProductDescription = product.description;
  this.editedProductStock = product.stock;
  this.editedProductCategory = product.category_id;
  this.editedProductProvider = product.provider_id;
  this.editedProductImageUrl = product.image;
  this.editedProductCancel = product.cancelproduct;
  this.editedProductcontpurchase = product.contpurchase;
  console.log(product)

  // Abrir el modal
  this.isEditProductModalOpen = true;
}

saveEditedProduct() {
  // Agregar la lógica para guardar los detalles del producto editado
  // Puedes acceder a los valores editados desde this.editedProductName
  // Cerrar el modal después de guardar
  // Verifico si el nombre del producto editado no esta vacio
  if (this.editedProductName.trim() === '') {
    console.error('El nombre del producto no puede estar vacio');
    return;
  }

  // Creo un objeto con los detalles editados del producto
  const editedProduct = {
    _id: this.selectedProduct,
    name: this.editedProductName,
    price: this.editedProductPrice,
    description: this.editedProductDescription,
    stock: this.editedProductStock,
    category_id: this.editedProductCategory,
    provider_id: this.editedProductProvider,
    image: this.editedProductImageUrl,
    contpurchase: this.editedProductcontpurchase,
    cancelproduct: this.editedProductCancel === 'true' // Convertir el string a boolean
  }

  this.clearVariables();
  // Llamo al servicio para editar el producto
  this.productService.updateProduct(editedProduct)
  .subscribe(
    (result:any) => {
      console.log('Producto editado correctamente', result);
      this.obtainProducts();
      this.closeEditProductModal();
    },
    (error: any) => {
      console.error('Error al editar el producto', error);
    }
  );
}

clearVariables(){
  this.selectedProduct = undefined;
  this.editedProductName = "";
  this.editedProductPrice = undefined;
  this.editedProductDescription = "";
  this.editedProductStock = undefined;
  this.editedProductCategory = undefined;
  this.editedProductProvider = undefined;
  this.editedProductImageUrl = undefined;
  this.editedProductcontpurchase = undefined;
  this.editedProductCancel = undefined;
}

// Restablecer las propiedades relacionadas con el modal y cerrar el modal PRODUCT
closeEditProductModal() {
  this.isEditProductModalOpen = false;
  this.editedProductName = '';
  this.isProductCreated = false;
  this.clearVariables();
}

// ****************************
// *** Create a new product ***
// ****************************

isProductCreated = false;
createProductName: string = '';
createProductPrice: any;
createProductDescription: string = '';
createProductStock: any;
createProductCategory: any;
createProductProvider: any;
createProductImageUrl: any;
createProductcontpurchase: any;
createProductCancel: any;

clearVariablesCreate(){
  this.createProductName = "";
  this.createProductPrice = undefined;
  this.createProductDescription = "";
  this.createProductStock = undefined;
  this.createProductCategory = undefined;
  this.createProductProvider = undefined;
  this.createProductImageUrl = undefined;
  this.createProductcontpurchase = undefined;
  this.createProductCancel = undefined;
}

openCreateProductModal(product: any) {
  this.obtainCategories();
  this.obtainProvidersModal();
  // Abrir el modal
  this.isProductCreated = true;
}

// Funcion para crear un producto
saveProduct(){

  let ok = false
  // Verifico si tengo campos vacios o no
  ok = this.ComprobarCampos(); 

  if ( !ok ) {
    // Creo un objeto con los detalles del producto
    const createProduct: Product = {
      name: this.createProductName,
      price: parseFloat(this.createProductPrice),
      description: this.createProductDescription,
      stock: parseInt(this.createProductStock),
      category_id: this.createProductCategory,
      provider_id: this.createProductProvider,
      image: this.createProductImageUrl,
      contpurchase: 0,
      cancelproduct: this.createProductCancel === 'true' // Convertir el string a boolean
    }
    if (this.existeProductoConNombre(this.createProductName)) {
      alert("El producto ya existe.")
    }
    else {
      // Llamo al servicio para crear el producto
      this.productService.createProduct(createProduct)
      .subscribe(
        (result:any) => {
          this.clearVariablesCreate(); // Vacio las variables
          console.log('Producto creado correctamente', result);
          let text: Provider = new Provider()
          this.obtainProducts(); // Recargo la lista de productos

          this.closeEditProductModal(); // Cierro el modal de crear producto
        },
        (error: any) => {
          console.error('Error al crear el producto', error);
      
          // Imprimir detalles del error si están disponibles
          if (error instanceof HttpErrorResponse) {
            console.error('Detalles del error:', error);
          }
        }
      );
      this.isProductCreated = false;
    }
  }
}

// Metodo para comprobar si existe un producto con ese nombre
existeProductoConNombre(nombreBuscado: string): boolean {
  return this.filteredProducts.some(producto => {
    if (producto.name === undefined || nombreBuscado === undefined) {
        return false;
    }
    return producto.name.toLowerCase().trim() === nombreBuscado.toLowerCase().trim();
  });
}

// Funcion que devuelve true y muestra alert con error en caso de haber un campo vacio y false si todo esta relleno
ComprobarCampos(): boolean{
  if (
    this.createProductName === undefined || this.createProductName.trim() === '' ||
    this.createProductPrice === undefined || this.createProductPrice.trim() === '' ||
    this.createProductDescription === undefined || this.createProductDescription.trim() === '' ||
    this.createProductStock === undefined || this.createProductStock.trim() === '' ||
    this.createProductCategory === undefined || this.createProductProvider === undefined ||
    this.createProductImageUrl === undefined || this.createProductImageUrl.trim() === '' ||
    this.createProductCancel === undefined
  )
  {
    alert("Por favor, rellene todos los campos.")
    return true;
  } 
  else {
    if (this.createProductPrice > 0 && this.createProductStock > 0) {
      return false; 
    } 
    else {
      alert('El valor debe ser numérico y mayor a cero.')
      return true;
    }
  }
}


  // ******************************
  // ********   CATEGORY   ******** 
  // ******************************
  // Lo uso para el model de crear y editar un producto
  obtainCategories() {
    this.categoryService.showCategories().subscribe((res) => {
      this.categoryService.categories = res as Category[];
      this.categories = [...this.categoryService.categories]; 
    });
  }
  // ******************************
  // ********   PROVIDERS   ******* 
  // ******************************
  // Lo uso para el model de crear y editar un producto
  obtainProvidersModal() {
    this.providerService.getAllProviders().subscribe((res: any) => {
      this.providerService.providerstodos = res.data as Provider[];
      console.log(res)
      this.providersModal = [...this.providerService.providerstodos]; 
    });
  }

  // ****************************
  // ********   IMAGEN   ******** 
  // ****************************

  public archivos: any =[]

  cogerImagen(event: any): any{
    const archivo = event.target.files[0]
    this.extraerBase64(archivo).then((imagen: any) => {
      console.log(imagen)
      console.log(imagen.base)
    })
    this.archivos.push(archivo)
    console.log(archivo)
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const filePath = selectedFile.name; // Accede a la propiedad name para obtener la ruta del archivo
      console.log('Ruta del archivo seleccionado:', filePath);
    }
  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event)
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg)
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };
    }
    catch (e) {
      console.log("Error: "+e)
      //return null
    }
  })

  /*guardarImagen(): any { 
    try{ 
      const formularioDeDatos = new FormData(); 
      this.archivos.forEach((archivo: any) => { 
        console.log(archivo); 
        formularioDeDatos.append('files', archivo)
      })  
      this.rest.post(`http://localhost:3001/upload`, formularioDeDatos)
      .subscribe(res => { 
        console.log('Respuesta del servidor', res);
      }) 
    } 
    catch (e) {
      console.log("ERROR", e); 
    }
  }*/

  /*async copyFile(sourcePath: string, destinationPath: string): Promise<string> {
    try {
      // Copiar el archivo directamente con fs
      fs.copyFileSync(sourcePath, destinationPath);
      return destinationPath;
    } catch (error) {
      console.error('Error copying file:', error);
      return "";
    }
  }*/

}
