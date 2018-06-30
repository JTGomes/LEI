import React, { Component } from 'react';
import FaNewspaperO from 'react-icons/lib/fa/newspaper-o';
import FaCog from 'react-icons/lib/fa/cog';
import FaEdit from 'react-icons/lib/fa/edit';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import News from './News';
import ModalEditResults from '../../../atleta/Resultados/components/modalAddResults';


class DropDownDir extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      modalNews: false,
      modalER: false,
      data: this.props.row,
    }
    this.toggleDrop = this.toggleDrop.bind(this);
    this.toggleNews = this.toggleNews.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  initModalNews(){
    this.setState({
      modalNews: true,
    });
  }

  initModalEdit() {
    this.setState({
      modalER: true,
    })
  }

  toggleDrop() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggleNews() {
    this.setState({
      modalNews: !this.state.modalNews,
    });
  }

  toggleEdit() {
    this.setState({
      modalER: !this.state.modalER,
    });
  }

  render() {
    return (
      <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={()=>this.toggleDrop()}>
          <DropdownToggle caret>
            <FaCog />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalNews()}><FaNewspaperO />&nbsp;Gerar Botícia</DropdownItem>
            <DropdownItem style={{cursor:'pointer'}} onClick={()=>this.initModalEdit()}><FaEdit />&nbsp;Editar Resultado</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <News
          modalNews={this.state.modalNews}
          toggle={this.toggleNews}
          component={this.state.data}/>
        <ModalEditResults
          modalAddResults={this.state.modalER}
          toggle={this.toggleEdit}
          role="Diretor"
          data={this.state.data}
          update={this.props.update}
          userData={this.props.userData} />
      </div>
);
  }
}

export default DropDownDir;
