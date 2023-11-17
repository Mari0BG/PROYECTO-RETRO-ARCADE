import express from 'express'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/product.controller.ts'; 
const router = express.Router() //con esto puedo usar operaciones CRUD

//Crear un nuevo product en la DB
router.post('/createProduct', createProduct)

//Actualizar product
router.put('/updateProduct/:id', updateProduct)

//obtener todos los products
router.get('/getAllProduct', getAllProducts)

//borrar product
router.delete('/deleteProduct/:id', deleteProduct)

export default router