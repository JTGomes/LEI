import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Check from 'react-icons/lib/fa/check';
import Close from 'react-icons/lib/fa/close';
import ModalUserInfo from '../../../components/ModalUserInfo';
import './style.css';
import {Button, Modal,ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


class Registo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      accept: false,
      modalUserInfo: false,
      uid: undefined,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleM = this.toggleM.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleM(){
    this.setState({
      modalUserInfo: !this.state.modalUserInfo,
    })
  }

  initModal(userid, aceitar){
    this.setState({
      modal: true,
      accept : aceitar,
      uid: userid,
    });
  }

  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }

  acceptUser(){
    //completar para aceitar o atleta
  }

  rejectUser(){
    //completar para rejeitar o atleta
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1>Atletas que aguardam validação</h1>
          </div>
        </div>
        <br/>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Nome do Atleta</th>
              <th>Aceitar/Rejeitar</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td style={{cursor:'pointer'}} onClick={()=>{this.initModalUser('userid')}}>João Dias do Amaral</td>
              <td>
                <Button color="success" onClick={()=>{this.initModal('uid',true)}}>
                  <Check />
                </Button>{'  '}
                <Button color="danger" onClick={()=>{this.initModal('uid',false)}}>
                  <Close />
                </Button>
              </td>
            </tr>

          </tbody>

        </Table>

        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Aceitação de Registo</ModalHeader>
          <ModalBody>
            {'Tem a certeza que pretende ' + (this.state.accept? 'aceitar o registo do atleta?' : 'rejeitar o registo do atleta?') }
          </ModalBody>
          <ModalFooter>
            {this.state.accept?
              <Button color="primary" onClick={()=>this.acceptUser()}>Aceitar</Button>
             :<Button color="primary" onClick={()=>this.rejectUser()}>Rejeitar</Button> }
            {' '}
              <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
          <ModalUserInfo toggle={this.toggleM} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
        </div>

    );
  }
}

export default Registo;
