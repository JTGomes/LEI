import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Cog from 'react-icons/lib/fa/cog';
import SendIcon from 'react-icons/lib/fa/paper-plane';
import RemoveIcon from 'react-icons/lib/go/x';
import Pay from 'react-icons/lib/fa/dollar';
import EquipIcon from 'react-icons/lib/io/tshirt';
import SendNotification from '../../../../components/SendNotification';

class OptionMenu extends Component {
 constructor(props) {
  super(props);

  this.toggle = this.toggle.bind(this);
  this.toggleS = this.toggleS.bind(this);
  this.state = {
    dropdownOpen: false,
    modalNotification: false,
  };
}

toggle() {
  this.setState(prevState => ({
    dropdownOpen: !prevState.dropdownOpen
  }));
}

toggleS(){
  this.setState({
    modalNotification: !this.state.modalNotification,
  })
}

initModalNotification(userID,name){
  this.setState({
      modalNotification: true,
      uid: userID,
      name: name,
  })
}

  render() {
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <Cog />
          </DropdownToggle>
          <DropdownMenu >
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalNotification()}><SendIcon style={{color:'#296ddb'}}/>{'  '}Enviar Notificação</DropdownItem>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.deleteUser()}><RemoveIcon style={{color:'red'}}/>{'  '}Remover Acesso</DropdownItem>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.Equipamento()}><EquipIcon />{'  '}Equipamento</DropdownItem>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.Pagamento()}><Pay style={{color: '#0fba00'}}/>{'  '}Pagamentos</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <SendNotification toggle={this.toggleS} user={this.props.uid} name={this.props.nome} isOpen={this.state.modalNotification}/>
      </div>
    );
  }
}




export default OptionMenu;
