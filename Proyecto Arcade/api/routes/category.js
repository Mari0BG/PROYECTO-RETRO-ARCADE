import express from 'express'
import { createCategory, updateCategory, getAllCategories, deleteCategory } from '../controllers/category.controller.js'
const router = express.Router() //con esto puedo usar operaciones CRUD

//Crear una nueva category en la DB
router.post('/create', createCategory)

//Actualizar category
router.put('/update/:id', updateCategory)

//obtener todas las categories
router.get('/getAll', getAllCategories)

//borrar category
router.delete('/delete/:id', deleteCategory)

export default router