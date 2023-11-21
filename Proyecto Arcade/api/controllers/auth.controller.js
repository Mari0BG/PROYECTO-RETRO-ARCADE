import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"

export const register = async (req,res, next)=>{
    
    const role = await Role.find({role: 'User'})  // el rol por defecto va a ser User
    const salt = await bcrypt.genSalt(10)   // salt para encripstar
    const hashPassword = await bcrypt.hash(req.body.password, salt) // contraseña encriptada
    const newUser= new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        address: req.body.address,
        profileImage: req.body.profileImage,
        isAdmin: req.body.isAdmin,
        roles: role,
    })
    await newUser.save()
    return next(CreateSuccess(200, "User Registered Successfully"))
}

export const registerAdmin = async (req,res, next)=>{
    
    const role = await Role.find({})  // el rol por defecto va a ser User
    const salt = await bcrypt.genSalt(10)   // salt para encripstar
    const hashPassword = await bcrypt.hash(req.body.password, salt) // contraseña encriptada
    const newUser= new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        address: req.body.address,
        profileImage: req.body.profileImage,
        isAdmin: true,
        roles: role,
    })
    await newUser.save()
    return next(CreateSuccess(200, "Admin Registered Successfully"))
}



export const login = async (req,res, next)=>{
    try { 
        const user = await User.findOne({email: req.body.email})
        .populate("roles", "role") //referencia al schema role
                                  // pertenece a mongoose y con esto cargara el rol en el response

        const {roles} = user  // para pasarlo al payload del jwt
        if(!user){
            return next(CreateError(404,"User not found"))
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect){
            return next(CreateError(404,"Password isn't correct"))
        }
        const token = jwt.sign(
            {id:user._id, isAdmin: user.isAdmin, roles: roles},
            process.env.JWT_SECRET
        )  // USER TOKEN
        res.cookie("access_token", token, {httpOnly: true})
        .status(200)
        .json({
            status: 200,
            message: "Login success",
            data:user
        })
    } catch (error) {
        return next(CreateError(500,"Something went wrong"))
    }
}