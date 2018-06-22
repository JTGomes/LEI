import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Table,Media, Modal, ModalHeader, ModalBody, ModalFooter, Button, ListGroup, ListGroupItem} from 'reactstrap';



class ModalUserInfo extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props);
    let user = this.props.treinador?'Treinador':'Atleta';
    return (
      <Modal isOpen={this.props.modalUserInfo} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>{'Dados do '+user}</ModalHeader>
        <ModalBody >
          <Media >
            <Media left>
              <Media className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} object src={require('./download.png')} />
            </Media>
            <Media body className="ml-5 mt-4">
              <span className="d-block lead">
                
              </span>
              <small className="d-block">João Gomes</small>
            </Media>
          </Media>
          <Table responsive>
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
                    <ListGroupItem><a href="https://facebook.com/" target={"_blank"}>facebook.com/jgomes</a></ListGroupItem>
                    <ListGroupItem><a href="https://twitter.com/" target={"_blank"}>twitter.com/jgomes</a></ListGroupItem>
                  </ListGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
            <Link to="/atleta">
            <Button color="primary" >{'Página do '+user }</Button>
            </Link>
            <Button color="secondary" onClick={this.props.toggle}>Sair</Button>
          </ModalFooter>
        </Modal>

    );
  }
}

export default ModalUserInfo;
