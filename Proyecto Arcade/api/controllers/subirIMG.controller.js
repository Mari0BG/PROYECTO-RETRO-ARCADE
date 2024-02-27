//import { Request, Response} from "express";
import multer from 'multer';
import path from 'path';
import { CreateError } from '../utils/error';
import { CreateSuccess } from "../utils/success.js"

const storage = multer.diskStore({
    destination: function (req, file, cb) {
        cb(null, 'api/imagenes');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage}).simple('image');

export const uploadImage = (req, res, next) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return next(CreateError(500, err.message))
            }

            if (!req.body.name && req.body.name != ''){
                const newCategory = new Category(req.body);
                if(req.file){
                    newCategory.image = req.file.path;
                }
                await newCategory.save();
                return next(CreateSuccess(200, "Image uploaded successfully."))
            }
            else {
                return next(CreateError(400, "Bad Request."))
            }
        })
    }
    catch (err) {
        return next(CreateError(500, "Internal server error."))
    }
}