import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CreateItem() {
  let history = useHistory();
  const [product_id, setproduct_id] = useState("");
  const [brand_id, setbrand_id] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("None");
  const [currentstock, setCurrentStock] = useState("0");
  const [requiredstock, setRequireStock] = useState("0");
  function clearFields() {
    setproduct_id("");
    setbrand_id("");
    setname("");
    setdesc("");
    setprice("");
    setcategory("None");
    setCurrentStock("0");
    setRequireStock("0");
  }
  return (
    <div className="container">
      <div style={{ marginTop: 10 }}>
        <h3>Create Inventory Item</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItem = {
              product_id: product_id,
              brand_id: brand_id,
              name: name,
              description: desc,
              category: category,
              per_quanitity_price: price,
              current_stock: currentstock,
              required_stock: requiredstock,
            };
            axios
              .post("http://localhost:4000/inventory/add", newItem)
              .then((res) => console.log(newItem, res.data));
            history.push({ pathname: "/", toastVisibility: true });
          }}
        >
          <div className="form-group" style={{ width: 400 }}>
            <label>Category : </label>
            <br />
            <select
              id="cate"
              value={category}
              style={{ width: 400 }}
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            >
              <option id="0" value={"None"}>
                None
              </option>
              <option id="1" value={"Electronics"}>
                Electronics
              </option>
              <option id="2" value={"Fashion"}>
                Fashion
              </option>
              <option id="3" value={"Grocery"}>
                Grocery
              </option>
              <option id="4" value={"Cutlery"}>
                Cutlery
              </option>
              <option id="5" value={"Frozen"}>
                Frozen
              </option>
              <option id="6" value={"Stationary"}>
                Stationary
              </option>
            </select>
          </div>
          <div className="form-group" style={{ width: 400 }}>
            <label>Product ID : </label>
            <input
              required
              id="p_id"
              type="text"
              className="form-control"
              value={product_id}
              onChange={(e) => {
                setproduct_id(e.target.value);
              }}
            />
          </div>
          <div className="form-group" style={{ width: 400 }}>
            <label>Product Name : </label>
            <input
              required
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <div className="form-group" style={{ width: 400 }}>
            <label>Description : </label>
            <input
              id="desc"
              type="text"
              className="form-control"
              value={desc}
              onChange={(e) => {
                setdesc(e.target.value);
              }}
            />
          </div>
          <div className="form-group" style={{ width: 400 }}>
            <label>Brand ID : </label>
            <input
              id="b_id"
              type="text"
              className="form-control"
              value={brand_id}
              onChange={(e) => {
                setbrand_id(e.target.value);
              }}
            />
          </div>
          <div className="form-group" style={{ width: 400 }}>
            <label>Price : </label>
            <input
              required
              id="desc"
              type="text"
              className="form-control"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </div>
          <div className="form-group" style={{ width: 400, display: "flex" }}>
            <div>
              <label>Current Stock: </label>
              <input
                id="desc"
                type="text"
                className="form-control"
                value={currentstock}
                onChange={(e) => {
                  setCurrentStock(e.target.value);
                }}
              />
            </div>
            <div style={{ width: 8 }}></div>
            <div>
              <label>Required Stock: </label>
              <input
                id="desc"
                type="text"
                className="form-control"
                value={requiredstock}
                onChange={(e) => {
                  setRequireStock(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              readOnly
              type="submit"
              value="Add"
              className="btn btn-primary"
              style={{ width: 100 }}
            />
            <input
              readOnly
              style={{ marginLeft: 8, width: 184 }}
              value="Reset"
              className="btn btn-primary"
              onClick={clearFields}
            />
            <input
              value="Cancel"
              className="btn btn-danger"
              onClick={() => {
                history.push("/");
              }}
              style={{ marginLeft: 8, width: 100 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
