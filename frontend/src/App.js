import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateEdt from "./components/create-edt.component";
import EditEdt from "./components/edit-edt.component";
import EdtList from "./components/edt-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Edts</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Edt</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={EdtList} />
          <Route path="/edit/:id" component={EditEdt} />
          <Route path="/create" component={CreateEdt} />
        </div>
      </Router>
    );
  }
}

export default App;