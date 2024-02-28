import mongoose, {Schema} from 'mongoose'

const ProviderSchema = mongoose.Schema(
    {
        name:{type: String, required: true},
        empresa:{type: String, required: true},
        address:{type: String, required: true},
        profileImage:{type: String, required: false, default:"https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg" }
    },
    {
        timestamps: true //fechas de alta
    }
)

export default mongoose.model("Provider", ProviderSchema)   