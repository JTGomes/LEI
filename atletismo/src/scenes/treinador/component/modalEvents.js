import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Label, Input, Button, Col } from 'reactstrap';

class ModalEvents extends React.Component {
  render() {
    return(
      <Modal isOpen={this.props.modalEvents} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Adicionar Evento'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Label for="from" sm={2}>Desde</Label>
              <Col sm={10}>
                <Input type="date" name="date" id="from" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="until" sm={2}>Até</Label>
              <Col sm={10}>
                <Input type="date" name="date" id="until" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="event">Evento</Label>
              <Input />
              <FormText>Título do evento que pretende mostrar no calendário para que todos os seus atletas possam ver.</FormText>
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

export default ModalEvents;