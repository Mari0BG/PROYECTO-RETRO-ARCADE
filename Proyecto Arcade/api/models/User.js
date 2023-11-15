import mongoose, {Schema} from 'mongoose'

const UserSchema = mongoose.Schema(
    {
        name:{type: String, required: true},
        email:{type: String, required: true, unique: true},
        password:{type: String, required: true},
        address:{type: String, required: true},
        profileImage:{type: String, required: false, default:"https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg" },
        isAdmin: {type: Boolean, default: false},
        roles:{type: [Schema.Types.ObjectId], required: true, ref: "Role"}   //clave foranea
    },
    {
        timestamps: true //fechas de alta
    }
)

export default mongoose.model("User", UserSchema)    // SE EXPORTA PORQUE SI NO, NO SE PUEDE USAR EL MODELO
                                                    //  en mongo se va a llamar user y se exporta como UserSchema