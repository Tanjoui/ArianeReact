import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateEdt from "./components/create-edt.component";
import EditEdt from "./components/edit-edt.component";
import EdtList from "./components/edt-list.component";
import Ariane from "./components/ariane.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Ariane />
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">Modules CRUD</Link>
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">List</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Edt</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br/>
          <Route path="/" exact component={EdtList} />
          <Route path="/:id" exact component={EdtList} />
          <Route path="/edit/:id" component={EditEdt} />
          <Route path="/create" component={CreateEdt} />

      </Router>
    );
  }
}

export default App;