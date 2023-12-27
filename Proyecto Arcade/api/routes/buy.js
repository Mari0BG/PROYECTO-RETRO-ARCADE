import express from 'express'
import { buyCart, getAllUserCarts,getAllCarts } from '../controllers/buy.controller.js'
const router = express.Router()

// Formalizar carrito
router.post("/buyCart", buyCart);

// Obtener todas las compras del usuario
router.get("/getUserCarts/:_idClient", getAllUserCarts);

// Obtener el carrito de todos los usuarios
router.get("/getAllCarts", getAllCarts);


export default router