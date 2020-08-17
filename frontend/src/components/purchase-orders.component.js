import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import csvlogo from "../csv3.png";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const status = [
  "Order Placed",
  "Order Received",
  "Shipped",
  "Order Delivered",
  "Closed",
  "Cancelled",
];
const DisplayItemList = (props) => (
  <tr onDoubleClick={() => {}}>
    <td>{props.data.product_id}</td>
    <td>{props.mst_data.name}</td>

    <td>
      <a
        style={{ width: 100 }}
        className={`${badgeColor(props.data.order_status)}`}
      >
        {status[props.data.order_status]}
      </a>
    </td>
    <td>{props.mst_data.current_stock}</td>
    <td>{props.mst_data.required_stock}</td>
    <td>{props.data.order_quantity}</td>
    <td>{props.mst_data.per_quanitity_price}</td>
    <td>{props.data.total_price}</td>
    <td>{props.data.payment_status}</td>
    <td>{props.data.order_date}</td>
  </tr>
);
function badgeColor(caption) {
  switch (caption) {
    case 3:
      return "badge badge-success";
    case 1:
      return "badge badge-primary";
    case 0:
      return "badge badge-light";
    case 2:
      return "badge badge-warning";
    case 4:
      return "badge badge-secondary";
    case 5:
      return "badge badge-danger";
  }
}

const notify = () => toast.info("Order Placed!", { position: "bottom-left" });
export default class PurchaseOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase_orders: [],
      inventory_mst: [],
      backupforfilter: [],
    };
    this.filterResults = this.filterResults.bind(this);
    if (props.location.toastVisibility) {
      notify();
    }
  }
  componentDidMount() {
    axios
      .get("https://inventorybackend.herokuapp.com/inventory/")
      .then((response) => {
        this.state.inventory_mst = response.data;

        axios
          .get(
            "https://inventorybackend.herokuapp.com/inventory/purchaseorders/"
          )
          .then((response) => {
            this.setState({
              purchase_orders: response.data,
              backupforfilter: response.data,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
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
      var datetoday = new Date(currentItem.order_date);
      var today = datetoday.toLocaleDateString("en-US");
      currentItem.order_date = today;
      return <DisplayItemList data={currentItem} mst_data={mst} key={i} />;
    });
  }
  downloadCSV() {
    window.open(
      "https://inventorybackend.herokuapp.com/inventory/downloadmst/2"
    );
  }
  filterResults(e) {
    this.setState({
      purchase_orders: this.state.backupforfilter.filter((item) => {
        return item.product_id.includes(e.target.value);
      }),
    });
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <h3>Purchase Orders</h3>
        <TextField
          type="text"
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="form-control"
          onChange={this.filterResults}
          placeholder="Product ID"
          style={{
            width: 136,
            float: "left",
            marginBottom: 16,
            marginTop: 8,
            maxHeight: 32,
          }}
        ></TextField>
        <button
          defaultValue="Download"
          className="btn btn-success"
          onClick={this.downloadCSV}
          style={{ width: 48, float: "right", marginBottom: 8, marginLeft: 8 }}
        >
          <img src={csvlogo} width="20" height="20" alt="editlogo" />
        </button>
        <input
          defaultValue="New Order"
          className="btn btn-success"
          onClick={() => {
            window.location.replace(
              "http://localhost:3000/createpurchaseorder/0"
            );
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

              <th>Order Quantity(NOS)</th>
              <th>Price($)</th>

              <th>Total Price($)</th>
              <th>Payment Status</th>
              <th>Order date</th>
            </tr>
          </thead>
          <tbody>{this.displayItemMstMethod()}</tbody>
        </table>
      </div>
    );
  }
}
