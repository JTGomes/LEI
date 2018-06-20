import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class ModalEditInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chkbox: false,
    };
    this.changeChk = this.changeChk.bind(this);
  }

  changeChk() {
    this.setState({
      chkbox: !this.state.chkbox,
    })
  }

  renderEncEdu() {
    if(this.state.chkbox) {
      return(
        <div className="EncEdu">
          <FormGroup>
            <Label for="EDUname">Nome do Encarregado de Educação</Label>
            <Input name="address" id="EDUname" placeholder="Maria Ana" />
          </FormGroup>
          <FormGroup>
            <Label for="EDUcontact">Contacto do Encarregado de Educação</Label>
            <Input name="contact" id="EDUcontact" placeholder="939393939" />
          </FormGroup>
        </div>
      );
    }
    else {
      return(
        <div className="EncEdu">
          <FormGroup>
            <Label for="EDUname">Nome do Encarregado de Educação</Label>
            <Input disabled name="name" id="EDUname" />
          </FormGroup>
          <FormGroup>
            <Label for="EDUcontact">Contacto do Encarregado de Educação</Label>
            <Input disabled name="contact" id="EDUcontact" />
          </FormGroup>
        </div>
      );
    }
  }

  render() {
    return(
      <Modal isOpen={this.props.modalDataEdit} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Editar Dados'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="addressform">Morada</Label>
              <Input type="address" name="address" id="addressform" placeholder="Avenida Falsa, 123" />
            </FormGroup>
            <FormGroup>
              <Label for="phoneform">Nº Telemóvel</Label>
              <Input name="phone" id="phoneform" placeholder="939393939" />
            </FormGroup>
            <FormGroup>
              <Label for="emailform">Endereço de E-mail</Label>
              <Input type="email" name="email" id="emailform" placeholder="example@example.com" />
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
              <Input name="address" id="postalform" placeholder="1111-111" />
            </FormGroup>
            <FormGroup>
              <Label for="locationform">Localidade</Label>
              <Input name="location" id="locationform" placeholder="Braga" />
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="checkbox" defaultChecked={this.state.chkbox} onChange={this.changeChk} /> Adicionar Encarregado de Educação
              </Label>
            </FormGroup>
            {this.renderEncEdu()}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success"><FaCheck />&nbsp;Submeter</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEditInfo;