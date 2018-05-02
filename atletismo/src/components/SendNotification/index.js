import React from 'react';
import {Button, Modal,ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import Send from 'react-icons/lib/fa/paper-plane';

class SendNotification extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      assunto: '',
      mensagem: '',
    }
  }

  onSubmit = (event) =>{
    console.log('send notification');
    //event.preventDefault();
  }

  render() {
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Notificação</ModalHeader>
        <Form onSubmit={this.onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="name">Para</Label>
              <Input required plaintext>{this.props.name}</Input>
            </FormGroup>
            <FormGroup>
              <Label for="assunto">Assunto</Label>
              <Input required type="text" id="assunto" placeholder="Assunto da notificação"
                onChange={event => this.setState({
                  'assunto': event.target.value
                })} />
              </FormGroup>
              <FormGroup>
                <Label for="mensagem">Mensagem</Label>
                <Input required rows="5" type="textarea" id="mensagem" placeholder="mensagem..."
                  onChange={event => this.setState({
                    'mensagem': event.target.value
                  })}/>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="success" type="submit">
                  <Send />{' '}
                    Enviar
                  </Button>{' '}
                  <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
              </Form>
            </Modal>

          );
      }
  }

export default SendNotification;
