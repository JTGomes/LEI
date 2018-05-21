import React from 'react';
import FaCog from 'react-icons/lib/fa/cog';
import FaCamera from 'react-icons/lib/fa/camera';
import FaChain from 'react-icons/lib/fa/chain';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ModalMedia from './modalMedia';
import ModalSocial from './modalSocial';

class dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      modalMedia: false,
      modalSocial: false,
    };
    //toggle dropdown
    this.toggle = this.toggle.bind(this);
    //toggle modals
    this.toggleM = this.toggleM.bind(this);
    this.toggleS = this.toggleS.bind(this);
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


  render() {
    return(
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            <FaCog />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalMedia()}><FaCamera />&nbsp;Adicionar Media</DropdownItem>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalSocial()}><FaChain style={{color:'blue'}}/>&nbsp;Partilhar</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ModalMedia modalMedia={this.state.modalMedia} toggle={this.toggleM} />
        <ModalSocial modalSocial={this.state.modalSocial} toggle={this.toggleS} />
      </div>
    );
  }
}

export default dropdown;