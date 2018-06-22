import React from 'react';
import {Button, Modal,ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import Send from 'react-icons/lib/fa/paper-plane';

class SendNotification extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filesURI:[],
      filesSizes: 0,
      assunto: '',
      mensagem: '',
    }
  }

  /*onSubmit = (event) =>{
    console.log(event);
    //event.preventDefault();
  }*/

  render() {
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Envio Planos de Treino</ModalHeader>
        <Form /*onSubmit={this.onSubmit}*/>
          <ModalBody>
            <FormGroup>
              <Label for="name">Para</Label>
              <Input type={"textarea"} rows={"3"} required readonly={"readonly"}>{this.props.to.toString()}</Input>
            </FormGroup>
            <input type="file" name="FirstName" multiple accept="true"></input>
          </ModalBody>
          <ModalFooter>
            <Button color="success" type="submit"><Send /> Enviar</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}


export default SendNotification