const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const inventory_routes = express.Router();
const PORT = 4000;
let Inventory = require('./inventory.model');

app.use(cors());
app.use(bodyParser.json());
app.use("/inventory", inventory_routes);

mongoose.connect("mongodb://127.0.0.1:27017/inventory_mst", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
inventory_routes.route('/').get(function(req, res) {
    Inventory.find(function(err, mst) {
        if (err) {
            console.log(err);
        } else {
            res.json(mst);
        }
    });
});
