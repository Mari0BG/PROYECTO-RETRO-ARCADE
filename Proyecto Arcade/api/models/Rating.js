import mongoose, {Schema} from 'mongoose'

const RatingSchema = mongoose.Schema(
    {
        _idProduct:{type: String, required: true},
        _idUser:{type: String, required: true},
        rating:{type: String, required: true},
        coment:{type: String, required: false},
    },
    {
        timestamps: true //fechas de alta
    }
)

export default mongoose.model("Rating", RatingSchema) 