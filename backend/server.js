const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const inventory_routes = express.Router();
const PORT = 4000;
let Inventory = require("./inventory.model");

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

// Get All Items

inventory_routes.route("/").get(function (req, res) {
  Inventory.find(function (err, mst) {
    if (err) {
      console.log(err);
    } else {
      res.json(mst);
    }
  });
});

// Get an Item

inventory_routes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Inventory.findById(id, function (err, mst) {
    res.json(mst);
  });
});

// Add Operation

inventory_routes.route("/add").post(function (req, res) {
  let inventory_item = new Inventory(req.body);
  inventory_item
    .save()
    .then((inventory_item) => {
      res.status(200).json({ mst: "mst item added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new mst item failed");
    });
});

// Update Operation

inventory_routes.route("/update/:id").post(function (req, res) {
  Inventory.findById(req.params.id, function (err, mst) {
    if (!mst) res.status(404).send("mst item is not found");
    else mst.product_id = req.body.product_id;
    mst.brand_id = req.body.brand_id;
    mst.name = req.body.name;
    mst.description = req.body.description;
    mst.quantity = req.body.quantity;
    mst.per_quanitity_price = req.body.per_quanitity_price;
    mst.sum_quantity_price = req.body.sum_quantity_price;
    mst
      .save()
      .then((mst) => {
        res.json("mst item updated!");
      })
      .catch((err) => {
        res.status(400).send("mst item Update not possible");
      });
  });
});
