import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { User } from 'src/app/models/user';
import { AdminControlService } from 'src/app/services/admin-control.service';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.css']
})
export default class AdminControlComponent {
  // Simulación de datos de clientes y productos (reemplazar con datos reales)
  clientsData: any[] = [{ name: 'Cliente 1' }, { name: 'Cliente 2' }];
  productsData: any[] = [{ name: 'Producto 1' }, { name: 'Producto 2' }];


  clientSearch: string = '';
  productSearch: string = '';
  filteredProducts: any[] = [];
  editedClientEmail: any;
  editedClientAddress: any;
  editedClientProfileImage: any;
  editedClientisAdmin: any;

  categories: any[] = [];

  constructor(public productService: ProductService, public adminControlService: AdminControlService, public categoryService: CategoryService, public userService: UserService) {
    this.filteredProducts = [...this.productService.products];
   }

  ngOnInit(): void {
    this.obtainProducts();
    this.obtainUsers()
  }
  
  obtainUsers() {
    this.adminControlService.showUsers().subscribe((res) => {
      const usersData = res.data;  // Accede al array de usuarios dentro del objeto 'res'
      this.adminControlService.users = usersData as User[];
      console.log(usersData);  // Muestra el array de usuarios en la consola
    });
  }

  // Funciones CRUD para clientes


  editClient(client: any) {
    // Lógica para editar el cliente
  }

  deleteClient(client: any) {
    // Lógica para eliminar el producto
    this.isPopupDeleteClient = true;
    this.selectedClient=client._id;
  }

  confirmDeleteClient() {
    if (this.selectedClient) {
      this.userService.deleteUser(this.selectedClient)
      .subscribe(
        (result: any) => {
          console.log('Cliente eliminado correctamente', result);
          this.obtainUsers(); // Actualizar la lista de clientes después de la eliminación
        },
        (error: any) => {
          console.error('Error al eliminar el cliente', error);
        }
      );
    }
    
    this.selectedClient = null;
    this.isPopupDeleteClient = false;
  }
  

  get filteredClients() {
    // Verificar si adminControlService.users es undefined o null antes de filtrar
    return this.adminControlService.users
      ? this.adminControlService.users.filter(client =>
          client.name.toLowerCase().includes(this.clientSearch.toLowerCase())
        )
      : [];
  }
  
  isEditClientModalOpen = false;
  editedClientName: string = '';


  openEditClientModal(client: any) {
    // Establecer los valores iniciales del formulario modal según el cliente seleccionado
    this.selectedClient = client._id
    this.editedClientName = client.name;
    this.editedClientEmail = client.email;
    this.editedClientAddress = client.address;
    this.editedClientProfileImage = client.profileImage;
    this.editedClientisAdmin = client.isAdmin
    this.selectedPass = client.password
    this.selectedRol = client.roles
    console.log(client)

    // Abrir el modal
    this.isEditClientModalOpen = true;
  }

  saveEditedClient() {
     // Verificar si el nombre del cliente editado no está vacío
    if (this.editedClientName.trim() === '') {
      // Puedes mostrar un mensaje de error o manejarlo según tus necesidades
      console.error('El nombre del cliente no puede estar vacío.');
      return;
    }
  
    // Crear un objeto con los detalles editados del cliente
    const editedClient = {
      _id: this.selectedClient, // Asegúrate de tener el ID del cliente seleccionado
      name: this.editedClientName,
      email: this.editedClientEmail,
      address: this.editedClientAddress,
      profileImage: this.editedClientProfileImage,
      isAdmin: this.editedClientisAdmin === 'true', // Convertir el string a boolean
      password: this.selectedPass,
      roles: this.selectedRol
      // Agregar otros campos según sea necesario
    };
  
    // Llamar al servicio para editar el cliente
    
    this.userService.updateUser(editedClient)
      .subscribe(
        (result: any) => {
          console.log('Cliente editado correctamente', result);
          this.obtainUsers(); // Actualizar la lista de clientes después de la edición
          this.closeEditClientModal(); // Cerrar el modal después de guardar
        },
        (error: any) => {
          console.error('Error al editar el cliente', error);
          // Puedes manejar el error según tus necesidades
        }
      );
  }

  closeEditClientModal() {
    // Restablecer las propiedades relacionadas con el modal y cerrar el modal
    this.isEditClientModalOpen = false;
    this.editedClientName = '';
    // Restablecer otras propiedades editadas si es necesario
  }

  selectedClient: any;
  selectedPass: any;
  selectedRol: any;
  isPopupDeleteClient = false;


// *****************************
// ********   PRODUCT   ******** 
// *****************************

  obtainProducts() {
    this.productService.showProducts().subscribe((res) => {
      this.productService.products = res as Product[];
      this.filteredProducts = [...this.productService.products]; // Mover aquí
      console.log(res);
    });
  }

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
  editedProductImageUrl: any;
  editedProductcontpurchase: any;
  editedProductCancel: any;

  openEditProductModal(product: any) {
    this.obtainCategories();
    // Establecer los valores iniciales del formulario modal según el producto seleccionado
    this.selectedProduct = product._id
    this.editedProductName = product.name;
    this.editedProductPrice = product.price;
    this.editedProductDescription = product.description;
    this.editedProductStock = product.stock;
    this.editedProductCategory = product.category_id;
    console.log(product.category_id)
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
    this.editedProductImageUrl = undefined;
    this.editedProductcontpurchase = undefined;
    this.editedProductCancel = undefined;
  }

  closeEditProductModal() {
    // Restablecer las propiedades relacionadas con el modal y cerrar el modal
    this.isEditProductModalOpen = false;
    this.editedProductName = '';
    this.isProductCreated = false;
    this.clearVariables();
    // Restablecer otras propiedades editadas si es necesario
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
  createProductImageUrl: any;
  createProductcontpurchase: any;
  createProductCancel: any;
  
  openCreateProductModal(product: any) {
    this.obtainCategories();
    // Abrir el modal
    this.isProductCreated = true;
  }

  // Logica para crear un producto
  saveProduct(){

    let ok = false

    // Verifico si el nombre del producto editado no esta vacio
   // ok = this.ComprobarCampos(); 

    if ( !ok ) {
      // Creo un objeto con los detalles editados del producto
      const createProduct: Product = {
        name: this.createProductName,
        price: parseFloat(this.createProductPrice),
        description: this.createProductDescription,
        stock: parseInt(this.createProductStock),
        category_id: this.createProductCategory,
        image: this.createProductImageUrl,
        contpurchase: 0,
        cancelproduct: this.createProductCancel === 'true' // Convertir el string a boolean
      }

      console.log(createProduct)

      const productData = new Product();

      // Rellenar los datos necesarios
      productData.name = "Galaxian 1 ";
      productData.price = 501.5;
      productData.description = "La mas peque de las peques";
      productData.stock = 12;
      productData.category_id = "655abbe0a628f0ea1f33cd8b";
      productData.image = "https://images-na.ssl-images-amazon.com/images/I/9131qJMMAvL._AC_SL1500_.jpg";
      productData.contpurchase = 0;
      productData.cancelproduct = false;

      console.log('productData:', productData);

      // Llamo al servicio para editar el producto
      this.productService.createProduct(productData)
      .subscribe(
        (result:any) => {
          this.clearVariables();
          console.log('Producto creado correctamente', result);
          this.obtainProducts();
          this.closeEditProductModal();
        },
        (error: any) => {
          console.error('Error al crear el producto', error);

          // Imprimir detalles del error si están disponibles
          if (error instanceof HttpErrorResponse) {
            console.error('Detalles del error:', error.error);
          }
        }
      );
      
      this.isProductCreated = false;
    }
  }

  // Compruebo que los campos no estan vacios
  ComprobarCampos(): boolean{
    // Devolver true si al menos un campo está vacío
    console.log(
      this.createProductName + " " +
      this.createProductPrice + " " +
      this.createProductDescription + " " +
      this.createProductStock + " " +
      this.createProductCategory + " " +
      this.createProductImageUrl + " " +
      this.createProductCancel + " " 
    )
    if (
      this.createProductName === undefined || this.createProductName.trim() === '' ||
      this.createProductPrice === undefined || this.createProductPrice.trim() === '' ||
      this.createProductDescription === undefined || this.createProductDescription.trim() === '' ||
      this.createProductStock === undefined || this.createProductStock.trim() === '' ||
      this.createProductCategory === undefined ||
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

obtainCategories() {
  this.categoryService.showCategories().subscribe((res) => {
    this.categoryService.categories = res as Category[];
    this.categories = [...this.categoryService.categories]; // Mover aquí
    console.log(res);
  });
}
}
