import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';


class ModalSocial extends React.Component {
  state = {
    text: 'Consegui atingir a 1ª classificação na prova de 100m no Rio de Janeiro, no dia 19/08/2016!',
  }

  //a ser completado com informaçao da prova...
  getText() {
    this.setState({
      text: "Teste Teste Teste"
    })
  }
  //altera o valor de text para corresponder ao introduzido
  handleChange(nvalue){
    this.setState({text:nvalue})
  }

  renderFacebook() {
    return(
      <option>Facebook</option>
    );
  }

  renderTwitter() {
    return(
      <option>Twitter</option>
    );
  }

  renderInstagram() {
    return(
      <option>Instagram</option>
    );
  }
  //a ser trabalhado numa fase futura
  renderSocial() {
    if(this.props.facebook) this.renderFacebook();
    if(this.props.twitter) this.renderTwitter();
    if(this.props.intagram) this.renderInstagram();
  }

  render() {
    return(
      <Modal isOpen={this.props.modalSocial} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Partilhar Resultado'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="socialform">Rede Social</Label>
              <Input type="select" name="socialtype" id="socialform">
                {this.renderFacebook()}
                {this.renderTwitter()}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Texto</Label>
              <Input type="textarea" name="text" id="exampleText" value={this.state.text} onChange={(event)=>this.handleChange(event.target.value)}/>
            </FormGroup>
          </Form>
          <Button color="success"><FaCheck />&nbsp;Submeter</Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalSocial;