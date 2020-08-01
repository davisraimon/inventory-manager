const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let purchase_orders = new Schema({
  product_id: {
    type: String,
  },
  product_name: {
    type: String,
  },
  current_stock: {
    type: String,
  },
  required_stock: {
    type: String,
  },
  order_status: {
    type: String,
  },
  per_quanitity_price: {
    type: String,
  },
  order_quantity: {
    type: String,
  },
  total_price: {
    type: String,
  },
  payment_status: {
    type: String,
  },
});
module.exports = mongoose.model("purchase_orders", purchase_orders);
