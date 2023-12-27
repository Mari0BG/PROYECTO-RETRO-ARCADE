import Buy from "../models/Buy.js";
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"


  // Crear y almacenar una nueva compra en la base de datos
  export const buyCart = async (req, res) => {
    try {
      const { _id, _idClient, products } = req.body;

      const newCart = new Buy({
        _idClient,
        products,
      });

      // Guardar el carrito en la base de datos
      const savedCart = await newCart.save();
      console.log(savedCart)
      res.status(201).json(savedCart);
    } catch (error) {
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
  } catch (error) {
    console.error('Error al obtener las compras del usuario:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


    // Obtener el carrito de todos los usuarios
    export const getAllCarts = async (req, res) => {
        try {
        // Buscar todos los carritos en la base de datos
        const allCarts = await Cart.find();
    
        res.status(200).json(allCarts);
        } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        }
    };

