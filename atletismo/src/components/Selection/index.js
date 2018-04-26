import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Selection extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return(
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            {this.props.name}
          </DropdownToggle>
          <DropdownMenu>
            {this.props.items.map(function(item, key){
              return(
                <DropdownItem>{item}</DropdownItem>
              );
            })}
        </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default Selection;