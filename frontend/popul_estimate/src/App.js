import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import "./App.css";
import Home from "./components/home/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/about/about";
import History from "./components/history/history";
import Header from "./components/header/header";
import Map from "./components/map/map";

function App() {
  return (
    <main>
      <Router>
        <Header></Header>

        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/history">
            <History />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
