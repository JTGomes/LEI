import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Cog from 'react-icons/lib/fa/cog';
import SendIcon from 'react-icons/lib/fa/paper-plane';
import RemoveIcon from 'react-icons/lib/go/x';
import SendNotification from '../../../../../components/SendNotification';


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
  })
}
  
  deleteUser(id) {

    axios.put('http://localhost:3000/api/Treinadors/removerPermissao',
    {id: id}
    ,{
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    })
    .then(res => this.remover(id) )
    .catch(error => console.log(error))

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
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.deleteUser(this.props.uid)}><RemoveIcon style={{color:'red'}}/>{'  '}Remover Acesso</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <SendNotification toggle={this.toggleS} user={this.props.uid} name={this.props.nome} isOpen={this.state.modalNotification}/>
      </div>
    );
  }
}




export default OptionMenu;
