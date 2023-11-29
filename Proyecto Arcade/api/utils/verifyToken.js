// utils/verifyToken.js
import jwt from 'jsonwebtoken';
import { CreateError } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies && req.cookies.access_token;

    if (!token) {
        return next(CreateError(401, "Token not found"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(CreateError(403, "Token not valid"));
        } else {
            req.user = user;
            next();
        }
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
            next();
        } else {
            return next(CreateError(403, "Not Authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            return next(CreateError(403, "Not Authorized"));
        }
    });
};
