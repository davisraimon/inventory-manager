import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CreatePurchaseOrder() {
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
        <h3>Create an Order</h3>
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
            history.push("/");
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
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
              <div
                className="form-group"
                style={{ width: 400, display: "flex" }}
              >
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
                  type="submit"
                  value="Pay"
                  className="btn btn-primary"
                  style={{ width: 100 }}
                />
                <input
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
            </div>
            <div style={{marginLeft:16}}>
              <div className="form-group" style={{ width: 400 }}>
                <label>Per Quantity Price : </label>
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
              <div className="form-group" style={{ width: 400 }}>
                <label>Order Quantity : </label>
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
              <div className="form-group" style={{ width: 400 }}>
                <label>Total Price : </label>
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
              <div className="form-group" style={{ width: 400 }}>
                <label>Shipping Costs : </label>
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
              <div className="form-group" style={{ width: 400 }}>
                <label>Total Amount to be Paid : </label>
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
