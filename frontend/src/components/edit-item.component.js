import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function EditItem(props) {
  let history = useHistory();
  useEffect(() => {
    axios
      .get("http://localhost:4000/inventory/" + props.match.params.id)
      .then((response) => {
        setproduct_id(response.data.product_id);
        setbrand_id(response.data.brand_id);
        setname(response.data.name);
        setdesc(response.data.description);
        setprice(response.data.per_quanitity_price);
        setcategory(response.data.category);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [product_id, setproduct_id] = useState("");
  const [brand_id, setbrand_id] = useState("");
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <h3>Create Inventory Item</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const updatedItem = {
              product_id: product_id,
              brand_id: brand_id,
              name: name,
              description: desc,
              category: category,
              per_quanitity_price: price,
            };
            axios
              .post(
                "http://localhost:4000/inventory/update/" +
                  props.match.params.id,
                updatedItem
              )
              .then((res) => console.log(res.data));
            history.push("/");
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
              id="desc"
              type="text"
              className="form-control"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
