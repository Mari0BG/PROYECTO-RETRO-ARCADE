import express from 'express'
import { login, register, registerAdmin, sendEmail,resetPassword } from '../controllers/auth.controller.js'

const router = express.Router()

// REGISTER
router.post("/register", register)

// LOGIN
router.post("/login", login)

// REGISTER AS ADMIN
router.post("/register-admin", registerAdmin)

// send email
router.post("/send-email", sendEmail)

//reset password
router.post("/reset-password", resetPassword)


export default router