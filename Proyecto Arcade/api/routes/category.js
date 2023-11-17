import express from 'express';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controllers/category.controller.js';
const router = express.Router() //con esto puedo usar operaciones CRUD

//Crear una nueva category en la DB
router.post('/createCategory', createCategory)

//Actualizar category
router.put('/updateCategory/:id', updateCategory)

//obtener todas las categories
router.get('/getAllCategories', getAllCategories)

//borrar category
router.delete('/deleteCategory/:id', deleteCategory)

export default router
