import Category from '../models/Category.js'
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"

export const createCategory =  async (req, res, next) => {
    try{
        if(req.body.name && req.body.name != ''){
            const newCategory = new Category(req.body)
            await newCategory.save()
            return next(CreateSuccess(200, "Category Created"))
        }else{
            return next(CreateError(400,"Bad Request"))
        }
    }catch(err){
        return next(CreateError(500,"Internal server error"))
    }
}

export const updateCategory = async (req, res, next)=>{
    try {
        const category = await Category.findById({_id: req.params.id})
        if(category){
            const newData = await Category.findByIdAndUpdate(
                req.params.id,
                {$set: req.body}, 
                {new: true}
            )
            return next(CreateSuccess(200, "Category updated"))
        }else{
            return next(CreateError(400,"Bad Request"))
        }
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
    }
}

export const getAllCategories = async (req, res, next) =>{
    try {
        const categories = await Category.find({})
        return res.status(200).send(categories)
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
    }
}

export const deleteCategory = async (req,res, next) =>{
    try {
        const categoryId = req.params.id
        const category = await Category.findById({_id: categoryId})
        if(category){
            await Category.findByIdAndDelete(categoryId)
            return next(CreateSuccess(200, "Category deleted"))
        }else{
            return next(CreateError(400,"Category not found"))
        }
    } catch (error) {
        return next(CreateError(500,"Internal server error"))
    }
}