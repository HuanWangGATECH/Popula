import React, { Component } from "react";
import "./dropDown.css";
class DropDown extends Component {
  state = {
    selected: 2000
  };

  render() {
    const { items, name, onChange } = this.props;
    return (
      <React.Fragment>
        <b>&nbsp; &nbsp; {name}</b>

        {/*       <DropdownButton
          variant="secondary"
          id="dropdown-item-button"
          title={items[0]}
          onChange={event => {
            this.setState({ selected: event.target.value });
          }}
        >
          {items.map(item => (
            <Dropdown.Item eventKey="1">{item}</Dropdown.Item>
          ))}
        </DropdownButton> */}

        <select
          name=""
          id=""
          className="btn btn-secondary dropdown-toggle"
          onChange={onChange}
        >
          {items.map(item => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </React.Fragment>
    );
  }
}
export default DropDown;
