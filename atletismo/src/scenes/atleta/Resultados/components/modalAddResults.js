import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormText, FormGroup, Label, Input, Button } from 'reactstrap';

class ModalAddResults extends React.Component {
  render() {
    return(
      <Modal isOpen={this.props.modalAddResults} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Adicionar Resultado'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="prova">Prova</Label>
              <Input />
              <FormText>Ex: Prova Europeia, Olímpica, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="tipo">Tipo</Label>
              <Input />
              <FormText>Ex: 100m, 400m, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="disciplina">Disciplina</Label>
              <Input />
              <FormText>Ex: Estafetas, Salto em Comprimento, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="provadata">Data</Label>
              <Input type="date" name="date" id="provadata" placeholder="date placeholder" />
            </FormGroup>
            <FormGroup>
              <Label for="local">Local</Label>
              <Input />
              <FormText>Ex: Braga, Porto, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="resultado">Resultado</Label>
              <Input />
              <FormText>Ex: 10,52s, 1024m, ...</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="classificacao">Classificação</Label>
              <Input type="number" name="number" id="classificacao" placeholder="Classificação Final da Prova" />
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

export default ModalAddResults;