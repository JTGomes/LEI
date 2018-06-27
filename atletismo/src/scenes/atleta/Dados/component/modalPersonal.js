import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class ModalEditInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chkbox: false,
      morada: undefined,
      telemovel: undefined,
      documento: undefined,
      codigopostal: undefined,
      localidade: undefined,
      encarregado: undefined,
      contactoEnc: undefined
    };
    this.changeChk = this.changeChk.bind(this);
  }

  changeChk() {
    this.setState({
      chkbox: !this.state.chkbox,
    })
  }

  getAtletaId(){
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Atleta?filter[where][userId]=${this.props.user}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
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
    console.log("SOU ESTE->" + this.props.user);
    this.getAtletaId().then(data => {
    const pars = {
      id: data,
      morada: this.state.morada,
      telemovel: this.state.telemovel,
      tipoDocumento: this.state.documento,
      codigoPostal: this.state.codigopostal,
      localidade: this.state.localidade,
      encarregado: this.state.encarregado,
      contactoEnc: this.state.contactoEnc
    }
    axios.put(`http://localhost:3000/api/Atleta/updateDados`, pars, config)
    .then(response => {
      })
    .catch(error => console.log(error))
    });
  }

  renderEncEdu() {
    if(this.state.chkbox) {
      return(
        <div className="EncEdu">
          <FormGroup>
            <Label for="EDUname">Nome do Encarregado de Educação</Label>
            <Input name="address" id="EDUname" placeholder="Nome do Encarregado" 
            onChange={event => this.setState({
                  'encarregado': event.target.value
                })}/>
          </FormGroup>
          <FormGroup>
            <Label for="EDUcontact">Contacto do Encarregado de Educação</Label>
            <Input name="contact" id="EDUcontact" placeholder="Número de Telemóvel" onChange={event => this.setState({
                  'contactoEnc': event.target.value
                })}/>
          </FormGroup>
        </div>
      );
    }
    else {
      return(
        <div className="EncEdu">
          <FormGroup>
            <Label for="EDUname">Nome do Encarregado de Educação</Label>
            <Input disabled name="name" id="EDUname" onChange={event => this.setState({
                  'encarregado': event.target.value
                })}/>
          </FormGroup>
          <FormGroup>
            <Label for="EDUcontact">Contacto do Encarregado de Educação</Label>
            <Input disabled name="contact" id="EDUcontact" 
            onChange={event => this.setState({
                  'contactoEnc': event.target.value
                })}/>
          </FormGroup>
        </div>
      );
    }
  }

  render() {
    return(
      <Modal isOpen={this.props.modalDataEdit} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Editar Dados'}</ModalHeader>
        <Form onSubmit={this.onSubmit}>
        <ModalBody>
            <FormGroup>
              <Label for="addressform">Morada</Label>
              <Input type="address" name="address" id="addressform" placeholder="Avenida Falsa, 123" onChange={event => this.setState({
                  'morada': event.target.value
                })}/>
            </FormGroup>
            <FormGroup>
              <Label for="phoneform">Nº Telemóvel</Label>
              <Input name="phone" id="phoneform" placeholder="939393939" onChange={event => this.setState({
                  'telemovel': event.target.value
                })}/>
            </FormGroup>
            <FormGroup>
              <Label for="documentform">Tipo de Documento</Label>
              <Input type="select" name="documenttype" id="documentform" onChange={event => this.setState({
                  'documento': event.target.value
                })}>
                <option>Bilhete de Identificação</option>
                <option>Cartão de Cidadão</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="postalform">Código Postal</Label>
              <Input name="address" id="postalform" placeholder="1111-111" onChange={event => this.setState({
                  'codigopostal': event.target.value
                })}/>
            </FormGroup>
            <FormGroup>
              <Label for="locationform">Localidade</Label>
              <Input name="location" id="locationform" placeholder="Braga" onChange={event => this.setState({
                  'localidade': event.target.value
                })}/>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.changeChk} /> Adicionar Encarregado de Educação
              </Label>
            </FormGroup>
            {this.renderEncEdu()}
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={this.props.toggle}><FaCheck />&nbsp;Submeter</Button>
        </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default ModalEditInfo;