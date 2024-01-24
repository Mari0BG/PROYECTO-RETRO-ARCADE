import express from'express'
import { deleteUserById, getAllUsers, getById, updateUserById } from '../controllers/user.controller.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

//getall
router.get('/', getAllUsers )   // se verifica el token y solo puede entrar usuario admin

//get by id
router.get('/:id', getById )  // se verifica que el usuario logado es el unico que puede acceder a su perfil

router.put('/:id', updateUserById)

router.delete('/:id', deleteUserById)

export default router 