import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FaCheck from 'react-icons/lib/fa/check';
import FaClose from 'react-icons/lib/fa/close';

class dropdownEquipment extends React.Component {
  render() {
    return(
      <Dropdown isOpen={this.props.dropdownOpen} toggle={this.props.toggle}>
        <DropdownToggle caret>
          Equipamento Disponibilizado
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem disabled><FaCheck style={{color:'green'}}/>&nbsp;Fato de Treino</DropdownItem>
        <DropdownItem disabled><FaClose style={{color:'red'}}/>&nbsp;Sapatilhas</DropdownItem>
        <DropdownItem disabled><FaCheck style={{color:'green'}}/>&nbsp;Mochila</DropdownItem>
        <DropdownItem disabled><FaCheck style={{color:'green'}}/>&nbsp;Camisola de Competição</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default dropdownEquipment;