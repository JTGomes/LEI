import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class ModalEditInfo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      morada: undefined,
      telemovel: undefined,
      codPostal: undefined,
      localidade: undefined,
      modalDataEdit: false,
    };
    this.toggleDE = this.toggleDE.bind(this);
  }

  toggleDE(){
    this.setState({
      modalDataEdit: !this.state.modalDataEdit,
    })
  }

  getTreinadorId(){

    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Treinadors?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          return response.data[0].id;
      })
      .catch(error => console.log(error))
  }

  onSubmit = (event) => {
    event.preventDefault();
    let config = {
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    }
    this.getTreinadorId().then(data => {
    const pars = {
      id: data,
      morada: this.state.morada,
      telemovel: this.state.telemovel,
      codPostal: this.state.codPostal,
      localidade: this.state.localidade
    }
    axios.put(`http://localhost:3000/api/Treinadors/updateDados`, pars, config)
    .then(response => {
      this.props.toggle;
      })
    .catch(error => console.log(error))
    });
  }

  render() {
    return(
      <Modal isOpen={this.props.modalDataEdit} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Editar Dados'}</ModalHeader>
        <Form onSubmit={this.onSubmit}>
        <ModalBody>
            <FormGroup>
              <Label for="addressform">Morada</Label>
              <Input type="address" name="address" id="addressform" placeholder="Avenida Falsa, 123" 
              onChange={event => this.setState({
                  'morada': event.target.value
                })}/>
            </FormGroup>
            <FormGroup>
              <Label for="phoneform">Nº Telemóvel</Label>
              <Input name="phone" id="phoneform" placeholder="939393939" 
              onChange={event => this.setState({
                  'telemovel': event.target.value
                })}/>
            </FormGroup>
            <FormGroup>
              <Label for="documentform">Tipo de Documento</Label>
              <Input type="select" name="documenttype" id="documentform">
                <option>Bilhete de Identificação</option>
                <option>Cartão de Cidadão</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="postalform">Código Postal</Label>
              <Input name="address" id="postalform" placeholder="1111-111" 
              onChange={event => this.setState({
                  'codPostal': event.target.value
                })}/>
            </FormGroup>
            <FormGroup>
              <Label for="locationform">Localidade</Label>
              <Input name="location" id="locationform" placeholder="Braga" 
              onChange={event => this.setState({
                  'localidade': event.target.value
                })}/>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={this.props.toggle}><FaCheck />&nbsp;Submeter</Button>
        </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(ModalEditInfo);