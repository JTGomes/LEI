import React, { Component } from 'react';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import {Button, Table, Alert } from 'reactstrap';
import ModalPagamento from './components/ModalPagamento';

const data=[{nome:'João Luís Costa',uid:'uid',mes: 3,},{nome:'Alfredo Lopes da Silva',uid:'uid',mes: 2,}]

class Pagamentos extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalUserInfo: false,
      uid: undefined,
      modalPagamento: false,
      meses: undefined,
    }
    this.toggle = this.toggle.bind(this);
    this.toggleP = this.toggleP.bind(this);
  }


  toggle(){
    this.setState({
      modalUserInfo: !this.state.modalUserInfo,
    })
  }

  toggleP(){
    this.setState({
      modalPagamento: !this.state.modalPagamento,
    })
  }



  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }

  initModalPagamento(userID, meses){
    this.setState({
      modalPagamento: true,
      uid: userID,
      meses: meses,
    })
  }


  getRow(obj,elem){
    return (<tr key={elem}>
             <td onClick={()=>this.initModalUser(obj.uid)} style={{cursor:'pointer'}}>{obj.nome}</td>
             <td className="text-center">{obj.mes}</td>
             <td className="text-center"><Button color="danger" onClick={()=>this.initModalPagamento(obj.uid,obj.mes)}>Pago</Button></td>
           </tr>);
  }

  render() {
    return (
      <div className="mt-3" >
      {data.length>0?
        <Table  responsive striped hover bordered>
          <thead >
            <tr>
              <th>Nome do Atleta</th>
              <th className="text-center">Meses em Atraso</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {data.map( (obj,elem) => this.getRow(obj,elem))}
         </tbody>
        </Table>
        :
        <Alert color="success">
          Não há pagamentos pendentes
        </Alert>
      }
      <ModalPagamento isOpen={this.state.modalPagamento}  user={this.state.uid} meses={this.state.meses} toggle={this.toggleP}/>
      <ModalUserInfo toggle={this.toggle} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
      </div>
    );
  }

}

export default Pagamentos;
