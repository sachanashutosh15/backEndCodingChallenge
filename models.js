const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  pricePerUnit: Number,
  totalQuantity: Number,
  quantityPerUnit: Number,
  unit: String,
})

const userSchema = mongoose.Schema({
  userType: String,
  name: String,
  password: String,
  address: String,
})

const productsModel = mongoose.model("products", productSchema);
const usersModel = mongoose.model("users", userSchema);

module.exports = { productsModel, usersModel }