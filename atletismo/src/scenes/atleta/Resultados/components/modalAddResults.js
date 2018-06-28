import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Label, Input, Button } from 'reactstrap';

class ModalAddResults extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nome: "",
      tipo: "",
      disciplina: "",
      data: "",
      local: "",
      resultado: "",
      classificacao: "",
      user: props.userId
    }
  }

  onSubmit = (event) =>{
    event.preventDefault();
    let config = {
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    }

    const pars = {
      nome: this.state.nome,
      tipo: this.state.tipo,
      disciplina: this.state.disciplina,
      data: this.state.data,
      local: this.state.local,
      resultado: this.state.resultado,
      classificacao: this.state.classificacao
    }
    console.log(this.props.user);
    axios.post(`http://localhost:3000/api/Atleta/${this.props.user}/resultados`, pars, config)
        .then(response => {
          this.props.toggle();
          })
        .catch(error => console.log(error))
  }

  render() {
    return(
      <Modal isOpen={this.props.modalAddResults} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Adicionar Resultado'}</ModalHeader>
        <Form onSubmit={this.onSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="prova">Prova</Label>
              <Input onChange={event => this.setState({
                  'nome': event.target.value
                })} />
              <FormText>Ex: Prova Europeia, Olímpica, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="tipo">Tipo</Label>
              <Input onChange={event => this.setState({
                  'tipo': event.target.value
                })} />
              <FormText>Ex: 100m, 400m, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="disciplina">Disciplina</Label>
              <Input onChange={event => this.setState({
                  'disciplina': event.target.value
                })} />
              <FormText>Ex: Estafetas, Salto em Comprimento, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="provadata">Data</Label>
              <Input onChange={event => this.setState({
                  'data': event.target.value
                })} />
            </FormGroup>
            <FormGroup>
              <Label for="local">Local</Label>
              <Input onChange={event => this.setState({
                  'local': event.target.value
                })} />
              <FormText>Ex: Braga, Porto, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="resultado">Resultado</Label>
              <Input onChange={event => this.setState({
                  'resultado': event.target.value
                })} />
              <FormText>Ex: 10.52, 9.78, ... (por defeito em segundos)</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="classificacao">Classificação</Label>
              <Input onChange={event => this.setState({
                  'classificacao': event.target.value
                })} />
              <FormText>Ex: 1º, 2º, 3º, ...</FormText>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit">
            <FaCheck />{' '}
              Submeter
          </Button>{' '}
        </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default ModalAddResults;