import multer from 'multer';
import path from 'path';
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imagenes');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

export const uploadImage = (req, res, next) => {
    try {
        upload(req, res, function (err) {
            if (err) {
                return next(CreateError(500, err.message));
            }
            const imagePath = req.file.path;
            return next(CreateSuccess(200, "Image Uploaded", req.file.path));
        });
    } catch (err) {
        return next(CreateError(500, "Internal server error."));
    }
};
