import express from 'express';
import { uploadImage } from '../controllers/subirIMG.controller.js';

const router = express.Router();

// Ruta para guardar la imagen
router.post('/create', uploadImage);

export default router;