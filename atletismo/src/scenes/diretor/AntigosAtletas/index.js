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
            <div className="pl-2" style={{cursor:'pointer'}} onClick={()=>this.initModalUser(row.original.uid)}>{row.original.nome_competicao}</div>
          )
        },
        {
          Header: 'Devolver Acesso',
          acessor: 'id',
          Cell: row => (
            <div className="text-center">
             <Button color="success"><Check /></Button>
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
    
    axios.get(`http://localhost:3000/api/Atleta?filter[where][ativo]=true`, config)
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
