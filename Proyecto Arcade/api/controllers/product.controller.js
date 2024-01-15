import Product from '../models/Product.js'
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"

export const createProduct = async (req, res, next) => {
    try {
        if (req.body.name && req.body.name != '') {
            const newProduct = new Product(req.body);
            await newProduct.save()
            return next(CreateSuccess(200, "Product Created", newProduct))
        }
        else {
            return next(CreateError(400, "Bad Request"))
        }
    } catch (error) {
        return next(CreateError(500, "Internal server error"))
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById({_id: req.params.id})
        if(product){
            const newData = await Product.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )
            return next(CreateSuccess(200, "Product Updated"))
        }
        else {
            return next(CreateError(400,"Bad Request"))
        }
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
    }
}

// Metodo para descontar el stock
export const updateProductStock = async (req, res, next) => {
    try {
        const product = await Product.findById({_id: req.params.id})
        if(product) {
            const newData = await Product.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            )
            return next(CreateSuccess(200, "Product Stock Updated"))
        }
        else {
            return next(CreateError(404,"Product not found"))
        }
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        return res.status(200).send(products)
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await Product.findById({_id: productId})
        if(product){
            await Product.findByIdAndDelete(productId)
            return next(CreateSuccess(200, "Product Deleted"))
        }
        else {
            return next(CreateError(404,"Product not found"))
        }
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
    }
}

