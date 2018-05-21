import React from 'react';
import FaCheck from 'react-icons/lib/fa/check';
import { Modal, ModalHeader, ModalBody, Form, FormText, FormGroup, Label, Input, Button } from 'reactstrap';

class ModalMedia extends React.Component {
  state = {
    isPhoto: true,
  }

  isPhotos() {
    this.setState({
      isPhoto: true,
    })
  }

  isVideos() {
    this.setState({
      isPhoto: false,
    })
  }

  renderInput() {
    if(this.state.isPhoto) {
      return(
        <FormGroup>
          <Label for="fileform"></Label>
          <Input type="file" name="file" id="fileform" />
          <FormText color="muted">
            Insira a sua fotografia da prova em que participou.
          </FormText>
        </FormGroup>
      );
    }
    else{
      return(
        <FormGroup>
          <Label for="youtubeLink">Link Youtube</Label>
          <Input type="text" name="youtube" id="youtubeLink" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </FormGroup>
      );
    }
  }

  render() {
    return(
      <Modal isOpen={this.props.modalMedia} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{'Adicionar Media'}</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="mediaform">Tipo de Media</Label>
              <Input type="select" name="mediatype" id="mediaform">
                <option onClick={()=>this.isPhotos()}>Fotografia</option>
                <option onClick={()=>this.isVideos()}>Vídeo</option>
              </Input>
            </FormGroup>
            {this.renderInput()}
          </Form>
          <Button color="success"><FaCheck />&nbsp;Submeter</Button>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalMedia;