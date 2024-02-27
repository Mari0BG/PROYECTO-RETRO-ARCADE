import express from 'express'
import { uploadImage } from '../controllers/subirIMG.controller.js'

const router = express.Router() //con esto puedo usar operaciones CRUD

// Para guardar la imagen
router.post('/', uploadImage)

export default router