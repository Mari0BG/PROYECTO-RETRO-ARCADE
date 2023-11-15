import express from 'express'
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js'

const router = express.Router() //con esto puedo usar operaciones CRUD

//Crear un nuevo rol en la DB
router.post('/create', createRole)

//Actualizar rol
router.put('/update/:id', updateRole)

//obtener todos los roles
router.get('/getAll', getAllRoles)

//borrar rol
router.delete('/delete/:id', deleteRole)

export default router