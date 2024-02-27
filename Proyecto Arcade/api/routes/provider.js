import express from'express'
import { deleteProviderById, getAllProviders, getById, updateProviderById, createProvider, getAllProviderProducts } from '../controllers/provider.controller.js'

const router = express.Router()

//Crear un nuevo proveedor
router.post('/create', createProvider)

//get all provider
router.get('/getAll', getAllProviders )

//get by id provider
router.get('/:id', getById )

// Update provider
router.put('/:id', updateProviderById)

// Delete provider
router.delete('/:id', deleteProviderById)

// Obtener todas los productos del proveedor
router.get("/getProviderProducts/:_idProvider", getAllProviderProducts);

export default router 