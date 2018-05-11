import React, { Component } from 'react';
import ReactTable from "react-table";
import ModalUserInfo from '../../../components/ModalUserInfo';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Check from 'react-icons/lib/fa/check';
const data=[{_id:1, nome: 'Júlio Santos dos Anjos', uid:'uid' },
            {_id:2, nome: 'António Luís Silva Marques', uid:'uid'},
            {_id:3, nome: 'Guilherme Ventura dos Reis', uid:'uid'},
            {_id:4, nome: 'Madalena Silva Barros', uid:'uid'},
            {_id:5, nome: 'Julieta Flores Costa Gonçalves', uid:'uid'},
          ]

class AntigosAtletas extends Component {
  constructor(props) {
   super(props);

   this.toggleMU = this.toggleMU.bind(this);
   this.state = {
     modalUserInfo: false,
     uid: undefined,
     input: '',
   };
 }

 toggleMU(){
   this.setState({
     modalUserInfo: !this.state.modalUserInfo,
   })
 }

 initModalUser(userID){
   this.setState({
     modalUserInfo: true,
     uid: userID,
   })
 }

 handleInputSubmit(event) {
   this.setState({
     input: event.target.value
   });
 }

 filter_data_byName(data){
         if(this.state.input===''){
           return data;
         }
         const text = this.state.input.toUpperCase();
         return data.filter( data_row => data_row.nome.toUpperCase().indexOf(text) !== -1);
     }

  render() {

    return (
      <div className="container-fluid">
      <div className="row">
        <Form className="col-lg-3">
          <FormGroup>
            <Input type="text" name="searchbar" id="searchbar" value={this.state.input} placeholder="Pesquisar Atleta" onChange={event => this.handleInputSubmit(event)}/>
          </FormGroup>
        </Form>
      </div>
      <ReactTable
        data={this.filter_data_byName(data)}
        columns={[
          {
          Header: 'Nome do Atleta',
          accessor: 'nome',
          Cell: row => (
            <div className="pl-2" style={{cursor:'pointer'}} onClick={()=>this.initModalUser(row.original.uid)}>{row.original.nome}</div>
          )
        },
        {
          Header: 'Devolver Acesso',
          acessor: 'uid',
          Cell: row => (
            <div className="text-center">
             <Button color="success"><Check /></Button>
            </div>
          )
        }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
      <ModalUserInfo toggle={this.toggleMU} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
      </div>

    );
  }
}

export default AntigosAtletas;
