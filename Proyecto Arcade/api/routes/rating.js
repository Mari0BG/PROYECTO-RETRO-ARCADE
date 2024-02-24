import express from 'express';
import {
    createRating,
    updateRating,
    getAllRatings,
    getRatingById,
    getAllRatingsByUserId,
    deleteRating
} from '../controllers/rating.controller.js';

const router = express.Router();

router.post('/create', createRating);
router.put('/update/:id', updateRating);
router.get('/getAll', getAllRatings);
router.get('/getById/:id', getRatingById);
router.get('/getAll/userRating/:id', getAllRatingsByUserId);
router.delete('/delete/:id', deleteRating);

export default router;
