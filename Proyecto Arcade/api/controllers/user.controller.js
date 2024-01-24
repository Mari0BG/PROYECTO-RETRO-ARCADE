import User from "../models/User.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"

// Obtener todos los usuarios
export const getAllUsers = async (req,res, next) =>{
  try {
      const users = await User.find()
      return next(CreateSuccess(200,"All users", users))
  } catch (error) {
      return next(CreateError(500, "Internal server error"))
  }
}

// Obtener usuario a traves de ID
export const getById = async (req,res, next) =>{
  try {
      const user = await User.findById(req.params.id)
      if(!user)
          return next(CreateError(404, "User not found"))
      return next(CreateSuccess(200,"Single User", user))
  } catch (error) {
      return next(CreateError(500, "Internal server error"))
  }
}

// Aztualizar datos usuario
export const updateUserById = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return next(CreateError(404, "User not found"));
    return next(CreateSuccess(200, "User updated successfully", updatedUser));
  } catch (error) {
    return next(CreateError(500, "Internal server error"));
  }
};

// Eliminar usuario
export const deleteUserById = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return next(CreateError(404, "User not found"));
    return next(CreateSuccess(200, "User deleted successfully", deletedUser));
  } catch (error) {
    return next(CreateError(500, "Internal server error"));
  }
};