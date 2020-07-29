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
inventory_routes.route("/").get(function (req, res) {
  Inventory.find(function (err, mst) {
    if (err) {
      console.log(err);
    } else {
      res.json(mst);
    }
  });
});
inventory_routes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Inventory.findById(id, function (err, todo) {
    res.json(todo);
  });
});

inventory_routes.route('/add').post(function(req, res) {
  console.log(req.body)
  let inventory_item = new Inventory(req.body);
  inventory_item.save()
      .then(inventory_item => {
          res.status(200).json({'todo': 'todo added successfully'});
      })
      .catch(err => {
          res.status(400).send('adding new todo failed');
      });
});
