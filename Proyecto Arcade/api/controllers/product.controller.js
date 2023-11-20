import Product from '../models/Product.js'

export const createProduct = async (req, res, next) => {
    try {
        //if (req.body && Object.keys(req.body).length > 0) {
        if(req.body.product && req.body.product != ''){
            const newProduct = new Product(req.body)
            await newProduct.save()
            return res.send("Product created")
        }
        else {
            return res.status(400).send("Bad Request")
        }
    } catch (error) {
        return res.status(500).send("Internal server error")
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
            return res.status(200).send("Product updated")
        }
        else {
            return res.status(400).send("Bad Request")
        }
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await Product.findById({_id: productId})
        if(product){
            await Product.findByIdAndDelete(productId)
            return res.status(200).send("Product deleted")
        }
        else {
            return res.status(404).send("Product not found")
        }
    } catch (error) {
        return res.status(500).sen("Internal server error")
    }
}
