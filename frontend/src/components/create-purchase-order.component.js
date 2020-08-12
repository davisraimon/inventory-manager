import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PaymentPage from "./PaymentPage";

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
  const [orderquantity, setOrderquantity] = useState("1");
  const [shippingcost, setShippingcost] = useState("0");
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
  function onFocusout() {
    axios
      .get("http://localhost:4000/inventory/product_id/" + product_id)
      .then((response) => {
        if (response.data[0] == undefined) {
          document.getElementById("p_id").focus();
        } else {
          setname(response.data[0].name);
          setdesc(response.data[0].description);
          setbrand_id(response.data[0].brand_id);
          setCurrentStock(response.data[0].current_stock);
          setRequireStock(response.data[0].required_stock);
          setprice(response.data[0].per_quanitity_price);
          if (
            response.data[0].required_stock - response.data[0].current_stock >
            0
          ) {
            setOrderquantity(
              response.data[0].required_stock - response.data[0].current_stock
            );
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="container">
      <div style={{ marginTop: 10 }}>
        <h3>Create Purchase Order</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div style={{ display: "flex" }}>
            <div>
              <div className="form-group" style={{ width: 400 }}>
                <label>Product ID : </label>
                <input
                  onBlur={onFocusout}
                  required
                  placeholder="Enter a Valid Product ID"
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
                  disabled
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
                  disabled
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
                  disabled
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
                    disabled
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
                    disabled
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
              <div className="form-group" style={{ display: "flex" }}>
                <PaymentPage
                  disabled={name === ""}
                  amount={orderquantity * price + parseInt(shippingcost)}
                  product_id={product_id}
                  order_quantity={orderquantity}
                ></PaymentPage>
                <input
                  style={{ marginLeft: 8, width: 184 }}
                  value="Reset"
                  readOnly
                  className="btn btn-primary"
                  onClick={clearFields}
                />
                <input
                  value="Cancel"
                  readOnly
                  className="btn btn-danger"
                  onClick={() => {
                    history.push("/purchaseorders");
                  }}
                  style={{ marginLeft: 8, width: 100 }}
                />
              </div>
            </div>
            <div style={{ marginLeft: 16 }}>
              <div className="form-group" style={{ width: 400 }}>
                <label>Per Quantity Price : </label>
                <input
                  disabled
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
                  value={orderquantity}
                  onChange={(e) => {
                    setOrderquantity(e.target.value);
                  }}
                />
              </div>
              <div className="form-group" style={{ width: 400 }}>
                <label>Total Price : </label>
                <input
                  disabled
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
                  disabled
                  required
                  id="desc"
                  type="text"
                  className="form-control"
                  value={shippingcost}
                  onChange={(e) => {
                    setShippingcost(e.target.value);
                  }}
                />
              </div>
              <div className="form-group" style={{ width: 400 }}>
                <label>Total Amount to be Paid : </label>
                <input
                  disabled
                  required
                  id="desc"
                  type="text"
                  className="form-control"
                  value={orderquantity * price + parseInt(shippingcost)}
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
