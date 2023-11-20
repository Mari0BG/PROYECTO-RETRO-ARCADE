import Category from '../models/Category.js'

export const createCategory =  async (req, res, next) => {
    try{
        if(req.body.name && req.body.name != ''){
            const newCategory = new Category(req.body)
            await newCategory.save()
            return res.send("Category created")
        }else{
            return res.status(400).send("Bad Request")
        }
    }catch(err){
        return res.status(500).send("Internal server error")
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
            return res.status(200).send("Category updated")
        }else{
            return res.status(404).send("Category not found")
        }
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}

export const getAllCategories = async (req, res, next) =>{
    try {
        const categories = await Category.find({})
        return res.status(200).send(categories)
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}

export const deleteCategory = async (req,res, next) =>{
    try {
        const categoryId = req.params.id
        const category = await Category.findById({_id: categoryId})
        if(category){
            await Category.findByIdAndDelete(categoryId)
            return res.status(200).send("Category deleted")
        }else{
            return res.status(404).send("Category not found")
        }
    } catch (error) {
        return res.status(500).send("Internal server error")
    }
}