import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  _idProduct: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  nameProduct: { type: String, required: true },
  imageProduct: { type: String, required: true },
  category_id: { type: String, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    _idClient: { type: String, required: true },
    products: [productSchema],
  },
  {
    timestamps: true,
  }
);

const Buy = mongoose.model("Buy", cartSchema);

export default Buy;
