import Buy from "../models/Buy.js";
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"

// Crear y almacenar una nueva compra en la base de datos
export const buyCart = async (req, res) => {
  try {
    const { _id, _idClient, products } = req.body;

    // Estructura con la que se guarda en la db
    const newCart = new Buy({
      _idClient,
      products,
    });

    // Guardar el carrito en la base de datos
    const savedCart = await newCart.save();
    //console.log(savedCart)
    res.status(201).json(savedCart);
  } 
  catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
}

// Obtener todas las compras del usuario por su _idClient
export const getAllUserCarts = async (req, res) => {
  try {
    const { _idClient } = req.params;

    // Buscar todas las compras del usuario en la base de datos 
    const userCarts = await Buy.find({ _idClient });

    res.status(200).json(userCarts);
  } 
  catch (error) {
    console.error('Error al obtener las compras del usuario:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtener el carrito de todos los usuarios
export const getAllCarts = async (req, res) => {
  try {
    const allCarts = await Buy.find({});
    res.status(200).json(allCarts);
  } 
  catch (error) {
    console.error("Error en getAllCarts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Metodo para devolver un carrito
export const getCart = async (req, res) => {
  try {
    const  _id  = req.params._id;

    // Buscar todas las compras del usuario en la base de datos 
    const userCarts = await Buy.find({ _id });

    res.status(200).json(userCarts);
  } 
  catch (error) {
    console.error('Error al obtener las compras del usuario:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Metodo para modificar compra
export const updateCart = async (req, res, next) => {
  try {
      const cart = await Buy.findById({_id: req.params.id})
      if(cart) {
          const newData = await Buy.findByIdAndUpdate(
              req.params.id,
              {$set: req.body},
              {new: true} // Hace que la fecha de modificacion se actualice
          )
          return next(CreateSuccess(200, "Carrito Updated"))
      }
      else {
          return next(CreateError(404,"Cart not found"))
      }
  } catch (error) {
      return next(CreateError(500,"Internal server error"))
  }
}

// Metodo para eliminar una compra
export const deleteCart = async (req, res, next) => {
  try {
      const cartId = req.params.id
      const cart = await Buy.findById({_id: cartId})
      if(cart){
          await Buy.findByIdAndDelete(cartId)
          return next(CreateSuccess(200, "Carrito Deleted"))
      }
      else {
          return next(CreateError(404,"Carrito not found"))
      }
  } catch (error) {
      return next(CreateError(500,"Internal server error"))
  }
}