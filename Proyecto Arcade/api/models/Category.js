import mongoose, {Schema} from "mongoose";

const categorySchema = mongoose.Schema ({

    name: {type: String, required: true}
    },
    {
        timestamps: true
    }
)