import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import editlogo from "../edit.jpg";
import deletelogo from "../delete.jpg";
import axios from "axios";

const DisplayItemList = (props) => (
  <tr onDoubleClick={() => {}}>
    <td>{props.data.product_id}</td>
    <td>{props.data.product_name}</td>
    <td>{props.data.current_stock}</td>
    <td>{props.data.required_stock}</td>
    <td>
      <a href="#" className={`${badgeColor(props.data.order_status)}`}>
        {props.data.order_status}
      </a>
    </td>
    <td>{props.data.per_quanitity_price}</td>
    <td>{props.data.order_quantity}</td>
    <td>{props.data.total_price}</td>
    <td>{props.data.payment_status}</td>
  </tr>
);
function badgeColor(caption) {
  switch (caption) {
    case "New":
      return "badge badge-light";
    case "Order Delivered":
      return "badge badge-success";
    case "Order Recieved":
      return "badge badge-primary";
    case "Order Placed":
      return "badge badge-primary";
    case "Shipped":
      return "badge badge-primary";
    case "Closed":
      return "badge badge-secondary";
    case "Cancelled":
      return "badge badge-danger";
  }
}
export default class PurchaseOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { purchase_orders: [],inventory_mst: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/inventory/purchaseorders/")
      .then((response) => {
        this.setState({ purchase_orders: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/inventory/")
      .then((response) => {
        this.setState({ inventory_mst: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  displayItemMstMethod() {
    return this.state.purchase_orders.map(function (currentItem, i) {
      return <DisplayItemList data={currentItem} key={i} />;
    });
  }
  render() {
    return (
      <div>
        <h3>Purchase Orders</h3>
        <input
          defaultValue="New Order"
          className="btn btn-success"
          style={{ width: 120, float: "right", marginBottom: 8 }}
        ></input>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Current Stock</th>
              <th>Required Stock</th>
              <th>Order Status</th>
              <th>Price</th>
              <th>Order Quantity</th>
              <th>Total Price</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>{this.displayItemMstMethod()}</tbody>
        </table>
      </div>
    );
  }
}
