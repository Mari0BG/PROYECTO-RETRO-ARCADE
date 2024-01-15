import express from 'express'
import { createProduct, updateProduct, getAllProducts, deleteProduct, updateProductStock } from '../controllers/product.controller.js'

const router = express.Router() //con esto puedo usar operaciones CRUD

//Crear un nuevo product en la DB
router.post('/create', createProduct)

//Actualizar product
router.put('/update/:id', updateProduct)

//Actualizar Stock product
router.put('/updateStock/:id', updateProductStock)

//obtener todos los products
router.get('/getAll', getAllProducts)

//borrar product
router.delete('/delete/:id', deleteProduct)

export default router