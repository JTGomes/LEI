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
    if(this.props.user){
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
                {this.props.user.user.nome}
              </span>
              {!this.props.treinador && <small className="d-block">{this.props.user.nome_competicao}</small>}
            </Media>
          </Media>
          <Table responsive>
            <tbody>
              <tr>
                <td>Data de Nascimento:</td>
                <td>{this.props.user.dataNascimento}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{this.props.user.user.email}</td>
              </tr>
              <tr>
                <td>Telemóvel</td>
                <td>{this.props.user.telemovel}</td>
              </tr>
              <tr>
                <td>Morada</td>
                <td>{this.props.user.morada}</td>
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
    }else{ return null}
  }
}

export default ModalUserInfo;
