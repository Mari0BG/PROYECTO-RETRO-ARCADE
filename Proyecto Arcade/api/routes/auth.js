import express from 'express'
import { login, register, registerAdmin } from '../controllers/auth.controller.js'

const router = express.Router()

// REGISTER
router.post("/register", register)

// LOGIN
router.post("/login", login)

// REGISTER AS ADMIN
router.post("/register-admin", registerAdmin)



export default router