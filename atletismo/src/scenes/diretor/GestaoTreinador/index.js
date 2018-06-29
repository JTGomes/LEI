import React, { Component } from 'react';
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
import 'react-table/react-table.css';
import ModalUserInfo from '../../../components/ModalUserInfo';
import SendNotificationALL from '../../../components/SendNotificationAll/SendNotificationALL.js'
import { Button } from 'reactstrap';
import OptionMenu from './components/OptionMenu';
import SendIcon from 'react-icons/lib/fa/paper-plane';
import {Form, FormGroup, Input, } from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
const CheckboxTable = checkboxHOC(ReactTable);


class GestaoTreinador extends Component {
 constructor(props) {
  super(props);

  this.toggleMU = this.toggleMU.bind(this);
  this.toggleNA = this.toggleNA.bind(this);
  this.state = {
    modalUserInfo: false,
    modalNotifyAll: false,
    uid: undefined,
    selection: [],
    selecionados: [],
    selectAll: false,
    input: '',
    data : []
  };
}

componentDidMount(){
  axios.get('http://localhost:3000/api/Treinadors/getTreinadores',{headers:{'Authorization' : 'Bearer ' + this.props.token}})
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

toggleNA(){
  this.setState({
    modalNotifyAll: !this.state.modalNotifyAll,
  })
}



toggleSelection = (key, shift, row) => {
  let selection = [...this.state.selection];
  let selecionados = [...this.state.selecionados];
  const keyIndex = selection.indexOf(key)
  if (keyIndex >= 0) {
    selection = [
      ...selection.slice(0, keyIndex),
      ...selection.slice(keyIndex + 1)
    ];
    selecionados = [
      ...selecionados.slice(0, keyIndex),
      ...selecionados.slice(keyIndex + 1)
    ];
  } else {
    selection.push(key);
    selecionados.push(row.user);
  }
  this.setState({ selection, selecionados });
};

handleInputSubmit(event) {
  this.setState({
    input: event.target.value
  });
}

remover(id){
  this.setState(prevState => ({
    data: prevState.data.filter(user => user.id !== id)
  }));
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
  const selecionados = [];
  if (selectAll) {
    const wrappedInstance = this.checkboxTable.getWrappedInstance();
    const currentRecords = wrappedInstance.getResolvedState().sortedData;
    currentRecords.forEach(item => {
      selection.push(item._original._id);
      selecionados.push(item._original.user)
    });
  }
  this.setState({ selectAll, selection, selecionados });
};

isSelected = key => {
  return this.state.selection.includes(key);
};

  render() {
 const { toggleSelection, toggleAll, isSelected } = this;
 const { selectAll } = this.state;

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
              <Input type="text" name="searchbar" id="searchbar" value={this.state.input} placeholder="Pesquisar treinador" onChange={event => this.handleInputSubmit(event)}/>
            </FormGroup>
          </Form>
          <div className="col-lg-3">
          <Button className={(this.state.selectAll|| this.state.selection.length>0)? "" : "disabled btnDisable"} color="primary" onClick={this.toggleNA}><SendIcon />{' '}Enviar Notificação</Button>
          </div>
        </div>
        <CheckboxTable
         ref={r => (this.checkboxTable = r)}
         data={this.filter_data_byName(this.state.data)}
         columns={[
           {
           Header: 'Nome do Treinador',
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
               <OptionMenu  nome={row.original.user.nome} id={row.original.id} uid={row.original.user.id} remover={()=> this.remover(row.original.id)}/>
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
     {this.state.modalNotifyAll && <SendNotificationALL  isOpen={this.state.modalNotifyAll} toggle={this.toggleNA} to={this.state.selecionados}/>}
     <ModalUserInfo toggle={this.toggleMU} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} treinador={true}/>
      </div>

    );
  }
}

function mapStateToProps(state){
  return {
    token: state.token
  };
}


export default connect(mapStateToProps)(GestaoTreinador);
