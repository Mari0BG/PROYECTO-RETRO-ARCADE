import mongoose from 'mongoose'

const RoleSchema = mongoose.Schema(
    {
        role:{type: String, required: true},
    },
    { 
        timestamps: true
    }
)

export default mongoose.model("Role", RoleSchema) // SE EXPORTA PORQUE SI NO, NO SE PUEDE USAR EL MODELO
                                                 //  en mongo se va a llamar role y se exporta como RoleSchema