import React, { Component } from 'react';
import { Table,Button } from 'reactstrap';
import Check from 'react-icons/lib/fa/check';
import PDF from 'react-icons/lib/fa/file-pdf-o';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import SendNotification from '../../../../../components/SendNotification';
import Send from 'react-icons/lib/fa/paper-plane';

class Exames extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalUserInfo: false,
      modalNotification: false,
      uid: undefined,
      name: undefined,
    }
    this.toggle = this.toggle.bind(this);
    this.toggleS = this.toggleS.bind(this);
  }


  toggle(){
    this.setState({
      modalUserInfo: !this.state.modalUserInfo,
    })
  }

  toggleS(){
    this.setState({
      modalNotification: !this.state.modalNotification,
    })
  }

  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }


  initModalNotification(userID,name){
    this.setState({
        modalNotification: true,
        uid: userID,
        name: name,
    })
  }

  render() {
    return (
      <div>
      <Table responsive hover striped>
        <thead>
          <tr>
            <th>Nome do Atleta</th>
            <th>Data de Nascimento</th>
            <th>Validar Exame Médico</th>
            <th>Exame Médico</th>
            <th>Notificar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{cursor:'pointer'}} onClick={()=>{this.initModalUser('userid')}}>
              Júlio Dias
            </td>
            <td>02/02/1994</td>
            <td >
              <Button color="success">
                < Check />{' '}
                Validar
              </Button>
            </td>
            <td>
              <a target='_blank' href="http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf">
              <Button color="secondary">
                <PDF />{' '}
                ver exame
              </Button>
              </a>
            </td>
            <td>
              <Button color="primary" onClick={()=> this.initModalNotification('userID','Júlio Dias')}>
                <Send />{' '}Nova Notificação
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <ModalUserInfo toggle={this.toggle} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
      <SendNotification toggle={this.toggleS} user={this.state.uid} name={this.state.name} isOpen={this.state.modalNotification}/>
      </div>
    );
  }

}

export default Exames;
