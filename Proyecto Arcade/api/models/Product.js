import mongoose, {Schema} from 'mongoose'

const productsSchema = mongoose.Schema ({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String, required: true},
    stock:{type: Number, required: true},
    category_id:{type: [Schema.Types.ObjectId], required: true, ref: "Category"},
    image:{type: String, required: false, default:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"},
    contpurchase:{type: Number, required: true},
    cancelproduct:{type: Boolean, required: true}
    },
    {
        timestamps: true
    }

);

export default mongoose.model("Product", productsSchema)   