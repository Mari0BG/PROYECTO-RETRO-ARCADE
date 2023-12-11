import Role from "../models/Role.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"
import nodemailer from "nodemailer"
import UserToken from "../models/UserToken.js"

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

export const sendEmail = async (req,res, next)=>{
    const email = req.body.email
    const user = await User.findOne({email: {$regex: '^'+email+'$', $options: 'i'}})
    if(!user){
        return next(CreateError(404,"User not found"))
    }
    const payload = {
        email: user.email
    }
    const expiryTime = 300
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime})

    const newToken = new UserToken({
        userId: user._id,
        token: token
    })

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "retroarcade68@gmail.com",
            pass: "timq boll wmkx bljs"
        }
    })
    let mailDetails = {
        from: "retroarcade68@gmail.com",
        to: email,
        subject: "Reset password",
        html: `
        <html>
        <head>
            <title>Password reset Request</title>
        </head>
        <body>
            <h1>Password reset Request</h1>
            <p>Hola ${user.name},</p>
            <p>Hemos recibido una petición para cambiar la contraseña de tu cuenta</p>
            <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: darkorchid; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">Cambiar contraseña</button></a>
        </body>
        </html>
        `
    }
    mailTransporter.sendMail(mailDetails, async(err, data)=>{
        if(err){
            console.log(err)
            return next(CreateError(500, "Something went wrong"))
        }else{
            await newToken.save()
            return next(CreateSuccess(200,"Mail sent successfully"))
        }
    })
}

export const resetPassword = async (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password;
  
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        email: { $regex: '^' + data.email + '$', $options: 'i' },
      });
  
      if (!user) {
        return next(CreateError(404, 'User not found'));
      }
  
      const salt = bcrypt.genSaltSync(10);
      const encryptedPassword = bcrypt.hashSync(newPassword, salt);
  
      user.password = encryptedPassword;
  
      const updateUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
  
      return next(CreateSuccess(200, 'Password Reset success'));
    } catch (error) {
      console.error(error);
      return next(CreateError(500, `Error resetting password: ${error.message}`));
    }
  };
  