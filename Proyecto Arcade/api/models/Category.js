import mongoose, {Schema} from "mongoose";

const categorySchema = mongoose.Schema (
    {
        name: {type: String, required: true},
        icon:{type: String, required: false, default:"https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"}
    },
    {
        timestamps: true
    }
);
export default mongoose.model("Category", categorySchema) 