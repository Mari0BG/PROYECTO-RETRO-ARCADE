import express from 'express'
import { buyCart, getAllUserCarts, getAllCarts, getCart, updateCart, deleteCart } from '../controllers/buy.controller.js'
const router = express.Router()

// Formalizar carrito
router.post("/buyCart", buyCart);

// Obtener todas las compras del usuario
router.get("/getUserCarts/:_idClient", getAllUserCarts);

// Obtener un carrito especifico
router.get("/getCart/:_id", getCart);

// Obtener el carrito de todos los usuarios
router.get('/getAllCarts', getAllCarts)

// Metodo para actualizar un carrito
router.put('/updateCart/:id', updateCart)

// Metodo para eliminar un carrito
router.delete('/deleteCart/:id', deleteCart)

export default router