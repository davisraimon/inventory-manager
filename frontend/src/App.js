import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EditItem from "./components/edit-item.component";
import CreateItem from "./components/create-item.component";
import InventoryList from "./components/inventory-list.component";
import DeleteItem from "./components/delete-item.component"
import logo from "./logo.jpg";

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{paddingLeft:32,paddingRight:32}}>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a
              className="navbar-brand"
              href="https://codingthesmartway.com"
            >
              <img
                src={logo}
                width="30"
                height="30"
                alt="CodingTheSmartWay.com"
              />
            </a>
            <Link to="/" className="navbar-brand">
              Inventory Manager
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    List
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">
                    Add Item
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
        </div>
      </Router>
    );
  }
}
export default App;
