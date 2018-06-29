import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import ModalUserInfo from '../../../components/ModalUserInfo';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Check from 'react-icons/lib/fa/check';

class AntigosAtletas extends Component {
  constructor(props) {
   super(props);

   this.toggleMU = this.toggleMU.bind(this);
   this.state = {
     modalUserInfo: false,
     uid: undefined,
     input: '',
     data : [],
     cols: [
        {
          Header: 'Nome do Atleta',
          accessor: 'nome_competicao',
          Cell: row => (
            <div className="pl-2" style={{cursor:'pointer'}} onClick={()=>this.initModalUser(row.original)}>{row.original.nome_competicao}</div>
          )
        },
        {
          Header: 'Devolver Acesso',
          acessor: 'id',
          Cell: row => (
            <div className="text-center">
             <Button color="success" onClick={() => this.validaAtleta(row.original.id) } ><Check /></Button>
            </div>
          )
        }
        ]
   };
 }

  componentDidMount() {

    let config = {
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    }

    axios.get(`http://localhost:3000/api/Atleta/getAtletasAntigos`, config)
        .then(response => {
          this.setState({
            data: response.data,
          })
        })
        .catch(error => console.log(error))
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
         return data.filter( data_row => data_row.nome_competicao.toUpperCase().indexOf(text) !== -1);
     }


validaAtleta(id){
  axios.put('http://localhost:3000/api/Atleta/darPermissao',
  {id: id}
  ,{
    headers: {'Authorization' : 'Bearer ' + this.props.token},
  })
  .then(res => this.remover(id) )
  .catch(error => console.log(error))
}

remover(id){
  this.setState(prevState => ({
    data: prevState.data.filter(user => user.id !== id)
  }));
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
        data={this.filter_data_byName(this.state.data)}
        columns={this.state.cols}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    <ModalUserInfo toggle={this.toggleMU} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
      </div>

    );
  }
}

export default AntigosAtletas;
