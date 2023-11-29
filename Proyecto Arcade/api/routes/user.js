import express from'express'
import { getAllUsers, getById } from '../controllers/user.controller.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

//getall
router.get('/',verifyAdmin, getAllUsers )   // se verifica el token y solo puede entrar usuario admin

//get by id
router.get('/:id',verifyUser, getById )  // se verifica que el usuario logado es el unico que puede acceder a su perfil

export default router 