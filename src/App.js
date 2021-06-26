import React, { Component } from "react";
import Header from "./components/Header/Header"
import Location from "./components/Weather/Location";
require('dotenv').config()

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Location />
      </div>
    );
  }
}


export default App;
