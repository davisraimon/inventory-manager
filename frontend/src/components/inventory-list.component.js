import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import editlogo from "../edit.jpg";
import deletelogo from "../delete.jpg";
import axios from "axios";

const DisplayItemList = (props) => (
  <tr onDoubleClick={()=>{}}>
    <td>{props.data.product_id}</td>
    <td>{props.data.name}</td>
    <td>{props.data.description}</td>
    <td>{props.data.brand_id}</td>
    <td>{props.data.category}</td>
    <td>{props.data.per_quanitity_price}</td>
    <td></td>
    <td></td>
    <td>
      <Link to={"/edit/" + props.data._id}>
        <img src={editlogo} width="30" height="30" />
      </Link>
    </td>
    <td>
      <Link to={"/delete/" + props.data._id}>
        <img src={deletelogo} width="30" height="30" />
      </Link>
    </td>
  </tr>
);

export default class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4000/inventory/")
      .then((response) => {
        this.setState({ list: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDeleteClick(id) {
    alert(id);
  }

  displayItemMstMethod() {
    return this.state.list.map(function (currentItem, i) {
      return <DisplayItemList data={currentItem} key={i} />;
    });
  }
  render() {
    return (
      <div>
        <h3>Inventory Master Data</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Brand ID</th>
              <th>Category</th>
              <th>Price</th>
              <th>Current Stock</th>
              <th>Required Stock</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.displayItemMstMethod()}</tbody>
        </table>
      </div>
    );
  }
}
