import Provider from "../models/Provider.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js"
import Product from "../models/Product.js"

// Crear un proveedor
export const createProvider = async (req, res, next) => {
  try {
      if (req.body.name && req.body.name != '') {
          const newProvider = new Provider(req.body);
          await newProvider.save()
          return next(CreateSuccess(200, "Provider Created", newProvider))
      }
      else {
          return next(CreateError(400, "Bad Request"))
      }
  } catch (error) {
      return next(CreateError(500, "Internal server error"))
  }
}

// Obtener todos los proveedores
export const getAllProviders = async (req,res, next) =>{
  try {
      const providers = await Provider.find()
      return next(CreateSuccess(200,"All providers", providers))
  } catch (error) {
      return next(CreateError(500, "Internal server error"))
  }
}

// Obtener proveedor a traves de ID
export const getById = async (req,res, next) =>{
  try {
      const provider = await Provider.findById(req.params.id)
      if(!provider)
          return next(CreateError(404, "Provider not found"))
      return next(CreateSuccess(200,"Single provider", provider))
  } catch (error) {
      return next(CreateError(500, "Internal server error"))
  }
}

// Aztualizar datos proveedor
export const updateProviderById = async (req, res, next) => {
  try {
    const updatedProvider = await Provider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProvider) return next(CreateError(404, "Provider not found"));
    return next(CreateSuccess(200, "Provider updated successfully", updatedProvider));
  } catch (error) {
    return next(CreateError(500, "Internal server error"));
  }
};

// Eliminar proveedor
export const deleteProviderById = async (req, res, next) => {
  try {
    const deletedProvider = await Provider.findByIdAndDelete(req.params.id);
    if (!deletedProvider) return next(CreateError(404, "Provider not found"));
    return next(CreateSuccess(200, "Provider deleted successfully", deletedProvider));
  } catch (error) {
    return next(CreateError(500, "Internal server error"));
  }
};


// Sacar productos de un proveedor
export const getAllProviderProducts = async (req, res) => {
  try {
    const { _idProvider } = req.params;
    const products = await Product.find({ provider_id: _idProvider }).exec();
    res.status(200).json(products);
  } 
  catch (error) {
    console.error('Error al obtener los productos del proveedor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};