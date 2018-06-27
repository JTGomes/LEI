import React from 'react';
import {Button, Modal,ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';
import Send from 'react-icons/lib/fa/paper-plane';
import axios from 'axios';
import {connect} from 'react-redux';
/**
 *  props:
 *  isOpen (booleano) => When to open
 *  toggle (function) => Que fazer quando carega-se fora da area do modal e em certos botões
 *  to => A quem é enviado as notificações
 *  withFile => booleano
 */
class SendNotificationALL extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            assunto: '',
            mensagem: '',
        }
    }

    getUsers(){
      return this.props.to.map(user => user.nome).toString()
    }

    onSubmit = (event) =>{
        event.preventDefault();
        const enviarPara = this.props.to.map(user => user.id)
        axios.post('http://localhost:3000/api/notificacaos/SendNotificationAll',
        {users: enviarPara,
          assunto: this.state.assunto,
          mensagem: this.state.mensagem
        },
        {headers: {'Authorization' : 'Bearer ' + this.props.token}}
        )
        .then(res => this.props.toggle())
        .catch(error => {console.log(error); this.props.toggle()})

    }

    render() {
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Notificação</ModalHeader>
                <Form onSubmit={this.onSubmit}>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Para</Label>
                            <Input type={"textarea"} rows={"3"} required value={this.getUsers()} readOnly={"readonly"}></Input>
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
                            <Input required rows="5" type="textarea" id="mensagem" placeholder=""
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


function mapStateToProps(state){
  return {
    token: state.token
  };
}


export default connect(mapStateToProps)(SendNotificationALL)
