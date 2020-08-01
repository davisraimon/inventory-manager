const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let purchase_orders = new Schema({
  product_id: {
    type: String,
  },
  status: {
    type: String,
  },
});
module.exports = mongoose.model("purchase_orders", purchase_orders);
