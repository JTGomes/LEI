import React, { Component } from 'react';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import {Button, Table, Alert, Form, FormGroup, Input } from 'reactstrap';
import ModalPagamento from '../../../../../components/ModalPagamento';

const data=[{nome:'João Luís Costa',uid:'uid',mes: ['janeiro','fevereiro','março'],},
            {nome:'Alfredo Lopes da Silva',uid:'uid',mes: ['fevereiro','março'],}]

class Pagamentos extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalUserInfo: false,
      uid: undefined,
      modalPagamento: false,
      meses: undefined,
      input: '',
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


  filter_data_byName(data){
          if(this.state.input===''){
            return data;
          }
          const text = this.state.input.toUpperCase();
          return data.filter( data_row => data_row.nome.toUpperCase().indexOf(text) !== -1);
   }

   handleInputSubmit(event) {
     this.setState({
       input: event.target.value
     });
   }

  getRow(obj,elem){
    return (<tr key={elem}>
             <td onClick={()=>this.initModalUser(obj.uid)} style={{cursor:'pointer'}}>{obj.nome}</td>
             <td className="text-center">{obj.mes.length}</td>
             <td className="text-center"><Button color="danger" onClick={()=>this.initModalPagamento(obj.uid,obj.mes)}>Pago</Button></td>
           </tr>);
  }

  render() {
    return (
      <div className="mt-3" >
      {data.length>0?
        <div>
          <div className="row">
            <Form className="col-lg-3">
              <FormGroup>
                <Input type="text" name="searchbar" id="searchbar" value={this.state.input} placeholder="Pesquisar Atleta" onChange={event => this.handleInputSubmit(event)}/>
              </FormGroup>
            </Form>
          </div>
          <Table  responsive striped hover bordered>
            <thead >
              <tr>
                <th>Nome do Atleta</th>
                <th className="text-center">Meses em Atraso</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.filter_data_byName(data).map( (obj,elem) => this.getRow(obj,elem))}
            </tbody>
          </Table>
        </div>
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
