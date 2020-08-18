import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import InventoryList from "./components/inventory-list.component";
import DeleteItem from "./components/delete-item.component";
import PurchaseOrders from "./components/purchase-orders.component";
import CreatePurchaseOrder from "./components/create-purchase-order.component";
import UpdatePurchaseOrder from "./components/update-purchase-order.component";

import logo from "./logo.jpg";

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ paddingLeft: 32, paddingRight: 32 }}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com">
              <img src={logo} width="30" height="30" />
            </a>
            <Link to="/" className="navbar-brand">
              Inventory Manager
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Inventory List
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/purchaseorders" className="nav-link">
                    Purchase Orders
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />

          <Route path="/" exact component={InventoryList} />
          <Route path="/edit/:id" component={EditItem} />
          <Route path="/create" component={CreateItem} />
          <Route path="/delete/:id" component={DeleteItem} />
          <Route path="/purchaseorders/" component={PurchaseOrders} />
          <Route
            path="/createpurchaseorder/:id"
            component={CreatePurchaseOrder}
          />
          <Route
            path="/updatepurchaseorder/:id"
            component={UpdatePurchaseOrder}
          />
        </div>
      </Router>
    );
  }
}
export default App;
