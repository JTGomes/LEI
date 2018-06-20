import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class ModalEditInfo extends React.Component {
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