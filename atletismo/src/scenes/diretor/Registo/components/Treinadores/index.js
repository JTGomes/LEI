import React, { Component } from 'react';
import Check from 'react-icons/lib/fa/check';
import Close from 'react-icons/lib/fa/close';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import {Button, Modal,ModalHeader, ModalBody, ModalFooter,Table} from 'reactstrap';



class Treinador extends Component {
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
      isento: false,
    });
  }

  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }


  acceptUser(){
    //completar para aceitar o treinador
  }

  rejectUser(){
    //completar para rejeitar o treinador
  }


  render() {
    return (
        <div>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Nome do treinador</th>
              <th>Aceitar/Rejeitar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{cursor:'pointer'}} onClick={()=>{this.initModalUser('userid')}}>José Mourinho</td>
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
          {'Tem a certeza que pretende ' +(this.state.accept? 'aceitar' : 'rejeitar')+' o Treinador?'}
          </ModalBody>
          <ModalFooter>
            {this.state.accept?
              <Button color="primary" onClick={()=>this.acceptUser()}>Aceitar</Button>
             :<Button color="primary" onClick={()=>this.rejectUser()}>Rejeitar</Button> }
            {' '}
              <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
          <ModalUserInfo toggle={this.toggleM} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} treinador={true}/>
        </div>

    );
  }
}

export default Treinador;
