import React, { Component } from "react";

import US1 from "./usmap1";
import DropDowns from "./dropDowns";
import DropDown from "./dropDown";

class Map extends Component {
  render() {
    return (
      <div>
        <br></br>
        {/* <DropDowns></DropDowns> */}
        <US1></US1>
        <br></br>

        <p>click state: zoom out</p>
        <p>click blank area in map/ click a county: zoom in</p>

        <p>In County model </p>
        <p>click county:zoom out, click again:zoom in</p>
      </div>
    );
  }
}

export default Map;
