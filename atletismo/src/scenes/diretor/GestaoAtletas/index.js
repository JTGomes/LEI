import React, { Component } from 'react';
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css';
import ModalUserInfo from '../../../components/ModalUserInfo';
import { Button } from 'reactstrap';
import OptionMenu from './components/OptionMenu';
import SendIcon from 'react-icons/lib/fa/paper-plane';
import {Form, FormGroup, Input, } from 'reactstrap';
import './style.css';
import axios from 'axios';
import {connect} from 'react-redux';
const CheckboxTable = checkboxHOC(ReactTable);


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
    data: []
  };
}

componentDidMount(){
  axios.get('http://localhost:3000/api/Atleta/getAtletas',{headers:{'Authorization' : 'Bearer ' + this.props.token}})
  .then(response => {
    let utilizadores = response.data.filter(user => user.user)
    utilizadores = utilizadores.map((utilizador, elem) => {utilizador._id = elem ; return utilizador})
    this.setState({ data : utilizadores })
  })
  .catch(error => console.log(error) )
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
        return data.filter( data_row => data_row.user.nome.toUpperCase().indexOf(text) !== -1);
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
    const { toggleSelection, toggleAll, isSelected} = this;
 const {  selectAll } = this.state;

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
         data={this.filter_data_byName(this.state.data)}
         columns={[
           {
           Header: 'Nome do Atleta',
           id: 'nome',
           accessor: (obj) => obj.user.nome,
           Cell: row => (
             <div className="pl-2" style={{cursor:'pointer'}} onClick={()=>this.initModalUser(row.original)}>{row.original.user.nome}</div>
           )
          },
         {
           Header: 'Opções',
           id: 'uid',
           accessor: (obj) => obj.id,
           minWidth: 20,
           Cell: row => (
             <div className="text-center">
               <OptionMenu  nome={row.original.user.nome} uid={row.original.id}/>
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

function mapStateToProps(state){
  return {
    token: state.token
  };
}


export default connect(mapStateToProps)(GestaoAtletas);
