import React from 'react';
import { Modal, ModalHeader, ModalBody, Form, FormText, FormGroup, Label, Input } from 'reactstrap';

class ModalPhoto extends React.Component {
  render() {
    return(
      <Modal isOpen={this.props.modalPhoto} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Editar Fotografia de Perfil'}</ModalHeader>
        <ModalBody>
          <Form>
            <img id="profile-pic" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NTU2MzE2NTI5Nzg4NDI3/usain-bolt-20702091-1-402.jpg" alt="profileimage" />
            <FormGroup>
              <Label for="fileform"></Label>
              <Input type="file" name="file" id="fileform" />
              <FormText color="muted">
                Insira a sua nova imagem de perfil.
              </FormText>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalPhoto;