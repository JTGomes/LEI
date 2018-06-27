import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import Dropdown from './components/dropdown';
import { Button } from 'reactstrap';
import ModalAddResults from './components/modalAddResults';
import "react-table/react-table.css";
import './Results.css';

//definir nome das colunas a aparecer na tabela
//accessor equivale ao campo ao qual a coluna corresponde  

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddResults: false,
      user: undefined,
      atletaID: undefined,
      data: [],
      col: [{
        Header: 'Prova',
        accessor: 'nome',
        filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
          return this.state.data.filter( data_row => data_row.nome.toUpperCase().indexOf(text) !== -1);},
        filterAll: true
      },{
        Header: 'Tipo',
        accessor: 'tipo',
      },{
        Header: 'Disciplina',
        accessor: 'disciplina',
          filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
            return this.state.data.filter( data_row => data_row.disciplina.toUpperCase().indexOf(text) !== -1);},
          filterAll: true
      },{
        Header: 'Data',
        accessor: 'data',
          filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
            return this.state.data.filter( data_row => data_row.data.toUpperCase().indexOf(text) !== -1);},
          filterAll: true
      },{
        Header: 'Local',
        accessor: 'local',
        filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
          return this.state.data.filter( data_row => data_row.local.toUpperCase().indexOf(text) !== -1);},
        filterAll: true
      },{
        Header: 'Resultado(s)',
        accessor: 'resultado',
      },{
        Header: 'Classificação',
        accessor: 'classificacao',
      },
      {
        Header: 'Opções',
        Cell: row => (
          <div className="text-center">
            <Dropdown />
          </div>
        ),
        filterable:false,
        sortable: false,
        style:{overflow:'visible'},
      }],
    }
    this.toggleAR = this.toggleAR.bind(this);
  }

  toggleAR(){
    this.setState({
      modalAddResults: !this.state.modalAddResults,
    })
  }

  initModalAddResult(id){
    this.setState({
      modalAddResults: true,
      user: id
    })
  }

  getAtletaId(){
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Atleta?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          return response.data[0].id;
      })
      .catch(error => console.log(error))
  }


  componentDidMount() {
    this.getAtletaId().then(data => {
      this.setState({
        atletaID: data
      });
      axios.get(`http://localhost:3000/api/Atleta/${data}/resultados`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
        .then(response => {
          this.setState({
            data: response.data
          })
        })
        .catch(error => console.log(error))
    });
  }

  render() {
    return(
      <div className="results container-fluid">
        <div className="results-button">
        <Button onClick={() => this.initModalAddResult()}>Adicionar Resultado</Button>
        </div>
        <ReactTable
          filterable
          data={this.state.data}
          columns={this.state.col}
          defaultPageSize={10}
        />
        <ModalAddResults modalAddResults={this.state.modalAddResults} toggle={this.toggleAR} user={this.state.atletaID}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(Results);