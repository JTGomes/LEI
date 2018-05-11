import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Form, FormGroup, Label} from 'reactstrap';


class ModalPagamento extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }




  render() {

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Pagamentos</ModalHeader>
        <ModalBody className="pb-0">
          Selecione o número de mensalidades a pagar
          <div className="mt-2 mb-3">
          <Input placeholder="número de mensalidades" type="number" step="1" min="0" max="12"/>
          </div>
          <div className="row justify-content-center mb-0">
          <small className="mb-0">Número de mensalidades pagas atualmente 0</small>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" >Efetuar Pagamento</Button>{' '}
          <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
    );
  }
}




export default ModalPagamento;
