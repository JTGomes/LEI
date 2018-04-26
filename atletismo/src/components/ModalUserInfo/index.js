import React, { Component } from 'react';
import {Table,Media, Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroup, ListGroupItem} from 'reactstrap';



class ModalUserInfo extends Component {

  render() {
    return (
      <Modal isOpen={this.props.modalUserInfo} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Dados do Atleta</ModalHeader>
        <ModalBody >
          <Media >
            <Media left>
              <Media className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} object src={require('./download.png')} />
            </Media>
            <Media body className="ml-5 mt-4">
              <span className="d-block lead">
                Joao Tiago Rocha Gomes
              </span>
              <small className="d-block">João Gomes</small>
            </Media>
          </Media>
          <Table responsive borderless>
            <tbody>
              <tr>
                <td>Data de Nascimento:</td>
                <td>02/02/1996</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>joaogomes@gmail.com</td>
              </tr>
              <tr>
                <td>Telemóvel</td>
                <td>918529637</td>
              </tr>
              <tr>
                <td>Morada</td>
                <td>Braga</td>
              </tr>
              <tr>
                <td>Redes Sociais</td>
                <td>
                  <ListGroup>
                    <ListGroupItem>facebook.com/jgomes</ListGroupItem>
                    <ListGroupItem>twitter.com/jgomes</ListGroupItem>
                  </ListGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
            <Button color="primary">Página Atleta</Button>
            <Button color="secondary" onClick={this.props.toggle}>Sair</Button>
          </ModalFooter>
        </Modal>

    );
  }
}

export default ModalUserInfo;
