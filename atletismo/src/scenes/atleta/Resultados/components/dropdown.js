import React from 'react';
import FaCog from 'react-icons/lib/fa/cog';
import FaCamera from 'react-icons/lib/fa/camera';
import FaChain from 'react-icons/lib/fa/chain';
import FaEdit from 'react-icons/lib/fa/edit';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ModalMedia from './modalMedia';
import ModalSocial from './modalSocial';
import ModalEditResults from './modalAddResults';
import {connect} from 'react-redux';

class dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      modalMedia: false,
      modalSocial: false,
      modalEditResults: false,
    };
    //toggle dropdown
    this.toggle = this.toggle.bind(this);
    //toggle modals
    this.toggleM = this.toggleM.bind(this);
    this.toggleS = this.toggleS.bind(this);
    this.toggleER = this.toggleER.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleM(){
    this.setState({
      modalMedia: !this.state.modalMedia,
    })
  }

  toggleS(){
    this.setState({
      modalSocial: !this.state.modalSocial,
    })
  }

  toggleER(){
    this.setState({
      modalEditResults: !this.state.modalEditResults,
    })
  }

  initModalMedia(){
    this.setState({
      modalMedia: true,
    })
  }

  initModalSocial(){
    this.setState({
      modalSocial: true,
    })
  }

  renderItems() {
    console.log(this.props.userRole);
    if(this.props.userRole==='Diretor')
      return(
        <div>
        <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalMedia()}><FaCamera />&nbsp;Adicionar Media</DropdownItem>
        <DropdownItem style={{cursor:'pointer'}} ><FaEdit />&nbsp;Editar Resultado</DropdownItem>
        </div>
      );
    else
      return(
        <div>
        <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalMedia()}><FaCamera />&nbsp;Adicionar Media</DropdownItem>
        <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalSocial()}><FaChain style={{color:'blue'}}/>&nbsp;Partilhar</DropdownItem>
        </div>
      );
  }


  render() {
    return(
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <FaCog />
          </DropdownToggle>
          <DropdownMenu>
            {/*<DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalMedia()}><FaCamera />&nbsp;Adicionar Media</DropdownItem>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalSocial()}><FaChain style={{color:'blue'}}/>&nbsp;Partilhar</DropdownItem>*/}
            {this.renderItems()}
          </DropdownMenu>
        </Dropdown>
        <ModalMedia modalMedia={this.state.modalMedia} toggle={this.toggleM} />
        <ModalSocial modalSocial={this.state.modalSocial} toggle={this.toggleS} />
        <ModalEditResults modalAddResults={this.state.modalEditResults} toggle={this.toggleER} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userRole: state.userRole
  };
}

export default connect(mapStateToProps)(dropdown);