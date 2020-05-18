import React, { Component } from "react";
import DropDown from "./dropDown";

class DropDowns extends Component {
  name1 = " Year: ";
  name2 = " State: ";
  name3 = " County: ";
  name4 = " Display By: ";
  years = [1000, 1900, 2000];
  states = ["VA", "PA"];
  counties = ["county1", "count2"];
  maps = ["State", "County"];
  render() {
    console.log(this.years);
    return (
      <div align="center">
        <DropDown items={this.years} name={this.name1}></DropDown>

        <DropDown items={this.states} name={this.name2}></DropDown>

        <DropDown items={this.counties} name={this.name3}></DropDown>
        <DropDown items={this.maps} name={this.name4}></DropDown>
      </div>
    );
  }
}
export default DropDowns;
