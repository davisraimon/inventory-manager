const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let inventory_mst = new Schema({
    product_id: {
        type: String
    },
    brand_id: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: String
    },
    per_quanitity_price: {
        type: String
    },
    sum_quantity_price: {
        type: String
    }
});
module.exports = mongoose.model('inventory_mst', inventory_mst);