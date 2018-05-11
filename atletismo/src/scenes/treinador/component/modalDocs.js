import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormText, FormGroup, Label, Input } from 'reactstrap';

class ModalEditDocs extends React.Component {
  render() {
    return(
      <Modal isOpen={this.props.modalDocs} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Editar Documentos'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="documentform">Tipo de Documento</Label>
              <Input type="select" name="documenttype" id="documentform">
                <option>Cartão de Cidadão</option>
                <option>Exame Médico</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="fileform"></Label>
              <Input type="file" name="file" id="fileform" />
              <FormText color="muted">
                Insira os documentos atualizados aqui. Estes serão processados e depois atualizados nos campos do seu perfil.
              </FormText>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalEditDocs;