import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DisplayItemList = (props) => (
  <tr>
    <td>{props.data.product_id}</td>
    <td>{props.data.name}</td>
    <td>{props.data.description}</td>
    <td>{props.data.brand_id}</td>    
    <td>{props.data.category}</td>
    <td>{props.data.per_quanitity_price}</td>
    <td>
      <Link to={"/edit/" + props.data._id}>Edit</Link>
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
        console.log(this.state.list);
      })
      .catch(function (error) {
        console.log(error);
      });
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.displayItemMstMethod()}</tbody>
        </table>
      </div>
    );
  }
}
