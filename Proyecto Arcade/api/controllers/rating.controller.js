import Rating from '../models/Rating.js';

// Crear un rating
export const createRating = async (req, res, next) => {
    try {
        const newRating = new Rating(req.body);
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        next(error);
    }
};

// Actualizar la valoración de un rating por su ID
export const updateRating = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, coment } = req.body;
        await Rating.findByIdAndUpdate(id, { rating,coment });
        res.status(200).json({ message: 'Rating updated successfully' });
    } catch (error) {
        next(error);
    }
};

// Obtener todos los ratings
export const getAllRatings = async (req, res, next) => {
    try {
        const ratings = await Rating.find();
        res.status(200).json(ratings);
    } catch (error) {
        next(error);
    }
};

// Obtener un rating por su ID
export const getRatingById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const rating = await Rating.findById(id);
        res.status(200).json(rating);
    } catch (error) {
        next(error);
    }
};

// Obtener todos los ratings de un usuario por su _idUser
export const getAllRatingsByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ratings = await Rating.find({ _idUser: id });
        res.status(200).json(ratings);
    } catch (error) {
        next(error);
    }
};

// Borrar un rating por su ID
export const deleteRating = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Rating.findByIdAndDelete(id);
        res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
        next(error);
    }
};
