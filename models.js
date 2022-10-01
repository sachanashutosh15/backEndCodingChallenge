const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  pricePerUnit: Number,
  totalQuantity: Number,
  quantityPerUnit: Number,
  unit: String,
})

const userSchema = mongoose.Schema({
  type: String,
  userName: String,
  password: String,
  address: String,
})

const productsModel = mongoose.model("products", productSchema);
const usersModel = mongoose.model("users", userSchema);

module.exports = { productsModel, usersModel }