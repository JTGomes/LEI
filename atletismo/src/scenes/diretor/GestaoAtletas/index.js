import React, { Component } from 'react';
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
const CheckboxTable = checkboxHOC(ReactTable);
import 'react-table/react-table.css';
import ModalUserInfo from '../../../components/ModalUserInfo';
import { Button } from 'reactstrap';
import OptionMenu from './OptionMenu';
import SendIcon from 'react-icons/lib/fa/paper-plane';
import {Form, FormGroup, Input, } from 'reactstrap';
import './style.css'

const data=[{_id:1, nome: 'Júlio Santos dos Anjos', uid:'uid' },
            {_id:2, nome: 'António Luís Silva Marques', uid:'uid'},
            {_id:3, nome: 'Guilherme Ventura dos Reis', uid:'uid'},
            {_id:4, nome: 'Madalena Silva Barros', uid:'uid'},
            {_id:5, nome: 'Julieta Flores Costa Gonçalves', uid:'uid'},
          ]

class GestaoAtletas extends Component {
 constructor(props) {
  super(props);

  this.toggleMU = this.toggleMU.bind(this);
  this.state = {
    modalUserInfo: false,
    uid: undefined,
    selection: [],
    selectAll: false,
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

toggleSelection = (key, shift, row) => {
  let selection = [...this.state.selection];
  const keyIndex = selection.indexOf(key)
  if (keyIndex >= 0) {
    selection = [
      ...selection.slice(0, keyIndex),
      ...selection.slice(keyIndex + 1)
    ];
  } else {
    selection.push(key);
  }
  this.setState({ selection });
};

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

toggleAll = () => {
  const selectAll = this.state.selectAll ? false : true;
  const selection = [];
  if (selectAll) {
    const wrappedInstance = this.checkboxTable.getWrappedInstance();
    const currentRecords = wrappedInstance.getResolvedState().sortedData;
    currentRecords.forEach(item => {
      selection.push(item._original._id);
    });
  }
  this.setState({ selectAll, selection });
};

isSelected = key => {
  return this.state.selection.includes(key);
};

  render() {
    const { toggleSelection, toggleAll, isSelected, logSelection } = this;
 const {  columns, selectAll } = this.state;

 const checkboxProps = {
   selectAll,
   isSelected,
   toggleSelection,
   toggleAll,
   selectType: "checkbox",
   getTrProps: (s, r) => {
     if(r){

     const selected = this.isSelected(r.original._id);
     return {
       style: {
         backgroundColor: selected ? "lightgreen" : "inherit"
       }
     };
   }else{
     return {};
   }
   }
 };
    return (
      <div className="container-fluid">


        <div className="row">
          <Form className="col-lg-3">
            <FormGroup>
              <Input type="text" name="searchbar" id="searchbar" value={this.state.input} placeholder="Pesquisar Atleta" onChange={event => this.handleInputSubmit(event)}/>
            </FormGroup>
          </Form>
          <div className="col-lg-3">
          <Button className={(this.state.selectAll|| this.state.selection.length>0)? "" : "disabled btnDisable"} color="primary"><SendIcon />{' '}Enviar Notificação</Button>
          </div>
        </div>
        <CheckboxTable
         ref={r => (this.checkboxTable = r)}
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
           Header: 'Opções',
           accessor: 'uid',
           minWidth: 20,
           Cell: row => (
             <div className="text-center">
               <OptionMenu  nome={row.original.nome} uid={row.original.uid}/>
             </div>
           ),

           sortable: false,
           style:{overflow:'visible'},

         }
      ]}
         defaultPageSize={10}
         className="-striped -highlight"
         {...checkboxProps}
       />

      <ModalUserInfo toggle={this.toggleMU} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
      </div>

    );
  }
}




export default GestaoAtletas;
