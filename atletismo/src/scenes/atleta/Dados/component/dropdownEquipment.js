import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FaCheck from 'react-icons/lib/fa/check';
import FaClose from 'react-icons/lib/fa/close';

class dropdownEquipment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      equipamentos: [],
      identificador: undefined,
    }
  }

  getAtletaId(){
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Atleta?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          return response.data[0].id;
      })
      .catch(error => console.log(error))
  }
  
  componentWillMount(){
    this.getAtletaId().then(data => {
      axios.get(`http://localhost:3000/api/Atleta/${data}/equipamento`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
        .then(response => {
          this.setState({
            equipamentos: response.data,
          })
        })
        .catch(error => console.log(error));
    });
  }

  faType(peca) {
    for(let i = 0; i < this.state.equipamentos.length; i++) {

      if(peca === this.state.equipamentos[i].nome) {
        return <FaCheck style={{color:'green'}}/>;
      }
    }
    return <FaClose style={{color:'red'}}/>;
  }

  render() {
    return(
      <Dropdown isOpen={this.props.dropdownOpen} toggle={this.props.toggle}>
        <DropdownToggle caret>
          Equipamento Disponibilizado
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem disabled>{this.faType("Fato de Treino")}{' '}Fato de Treino</DropdownItem>
        <DropdownItem disabled>{this.faType("Sapatilhas")}{' '}Sapatilhas</DropdownItem>
        <DropdownItem disabled>{this.faType("Mochila")}{' '}Mochila</DropdownItem>
        <DropdownItem disabled>{this.faType("Camisola de Competição")}{' '}Camisola de Competição</DropdownItem>
        <DropdownItem disabled>{this.faType("Pólo")}{' '}Pólo</DropdownItem>
        <DropdownItem disabled>{this.faType("Calções de Passeio")}{' '}Calções de Passeio</DropdownItem>
        <DropdownItem disabled>{this.faType("Kispo")}{' '}Kispo</DropdownItem>
        <DropdownItem disabled>{this.faType("Sweatshirt")}{' '}Sweatshirt</DropdownItem>
        <DropdownItem disabled>{this.faType("Lycras")}{' '}Lycras</DropdownItem>
        <DropdownItem disabled>{this.faType("Impermeável")}{' '}Impermeável</DropdownItem>
        <DropdownItem disabled>{this.faType("T-Shirt")}{' '}T-Shirt</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(dropdownEquipment);