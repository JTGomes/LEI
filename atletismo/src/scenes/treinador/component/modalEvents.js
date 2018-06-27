import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Label, Input, Button, Col } from 'reactstrap';

class ModalEvents extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      evento: "undefined",
      dia: undefined,
      mes: undefined,
      ano: undefined,
      duracao: "0",
    }
  }

  getTreinadorId () {

    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Treinadors?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
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
    
    for(let i = 0; i < this.props.atletas.length; i++) {
      const pars = {
        evento: this.state.evento,
        dia: this.state.dia,
        mes: this.state.mes,
        ano: this.state.ano,
        duracao: this.state.duracao
      }
      axios.post(`http://localhost:3000/api/Atleta/${this.props.atletas[i]}/evento`, pars, config)
    .then(response => {
      })
    .catch(error => console.log(error))

    }

  }

  render() {
    return(
      <Modal isOpen={this.props.modalEvents} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Adicionar Evento'}</ModalHeader>
        <Form onSubmit={this.onSubmit}>
        <ModalBody>
            <FormGroup row>
            <Col sm={10}>
              <Label for="from" sm={2}>Dia</Label>
                <Input type="number" onChange={event => this.setState({
                  'dia': event.target.value
                })} />
              <Label for="from" sm={2}>Mês</Label>
                <Input type="number" onChange={event => this.setState({
                  'mes': event.target.value
                })} />
              <Label for="from" sm={2}>Ano</Label>
                <Input type="number" onChange={event => this.setState({
                  'ano': event.target.value
                })} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="event">Evento</Label>
              <Input type="text" onChange={event => this.setState({
                  'evento': event.target.value
                })}/>
              <FormText>Título do evento que pretende mostrar no calendário para que todos os seus atletas possam ver.</FormText>
            </FormGroup>
          
        </ModalBody>
        
        <ModalFooter>
          <Button color="success" type="submit"><FaCheck />{' '}Submeter</Button>
        </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(ModalEvents);