import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DisplayItemList = (props) => (
  <tr onDoubleClick={() => {}}>
    <td>{props.data.product_id}</td>
    <td>{props.mst_data.name}</td>
    
    <td>
      <a style={{width:100}} className={`${badgeColor(props.data.order_status)}`}>
        {props.data.order_status}
      </a>
    </td>
    <td>{props.mst_data.current_stock}</td>
    <td>{props.mst_data.required_stock}</td>
    <td>{props.data.order_quantity}</td>
    <td>{props.mst_data.per_quanitity_price}</td>
    <td>{props.data.total_price}</td>
    <td>{props.data.payment_status}</td>
  </tr>
);
function badgeColor(caption) {
  switch (caption) {
    case "Order Delivered":
      return "badge badge-success";
    case "Order Recieved":
      return "badge badge-primary";
    case "Order Placed":
      return "badge badge-light";
      case "New":
      return "badge badge-light";
    case "Shipped":
      return "badge badge-warning";
    case "Closed":
      return "badge badge-secondary";
    case "Cancelled":
      return "badge badge-danger";
  }
}

const notify = () => toast.info("Order Placed!",{position: "bottom-left"});
export default class PurchaseOrders extends Component {
  constructor(props) {
    super(props);
    this.state = { purchase_orders: [], inventory_mst: [] };
    if(props.location.toastVisibility){notify();} 
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/inventory/")
      .then((response) => {
        this.setState({ inventory_mst: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:4000/inventory/purchaseorders/")
      .then((response) => {
        this.setState({ purchase_orders: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  displayItemMstMethod() {
    var temp = this.state.inventory_mst;
    return this.state.purchase_orders.map(function (currentItem, i) {
      var mst = temp.find(
        (element) => element.product_id == currentItem.product_id
      );
      return <DisplayItemList data={currentItem} mst_data={mst} key={i} />;
    });
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <h3>Purchase Orders</h3>
        <input
          defaultValue="New Order"
          className="btn btn-success"
          onClick={() => {
            window.location.replace("http://localhost:3000/createpurchaseorder");
          }}
          style={{ width: 120, float: "right", marginBottom: 8 }}
        ></input>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Order Status</th>
              <th>Current Stock</th>
              <th>Required Stock</th>
              
              <th>Order Quantity</th>
              <th>Price</th>
              
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
