import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Button, Modal,ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import Send from 'react-icons/lib/fa/paper-plane';

class SendNotification extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      assunto: '',
      mensagem: '',
      user: props.userId
    }
  }

  onSubmit = (event) =>{
    event.preventDefault();
    let config = {
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    }
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    if(day.toString().length == 1)
      day = "0"+day;
    if(month.toString().length == 1)
      month = "0"+month;
    var tempo = `${day}/${month}/${year}`;
    const pars = {
      data: tempo,
      mensagem: this.state.mensagem,
      assunto: this.state.assunto
    }
    console.log(this.props.user);
    axios.post(`http://localhost:3000/api/Users/${this.props.user}/notificacoes`, pars, config)
        .then(response => {
          this.props.toggle();
          })
        .catch(error => console.log(error))
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
