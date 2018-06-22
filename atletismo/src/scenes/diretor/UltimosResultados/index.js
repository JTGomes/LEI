import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";
import News from './components/News';
//import matchSorter from 'match-sorter'


class UltimosResultados extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resultados: [],
      cols: [
        {
              Header: 'Nome',
              accessor: 'nome_competicao',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return this.state.data.filter( data_row => data_row.nome.toUpperCase().indexOf(text) !== -1);},
              filterAll: true
            },{
              Header: 'Prova',
              accessor: 'nome',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return this.state.data.filter( data_row => data_row.prova.toUpperCase().indexOf(text) !== -1);},
              filterAll: true
            }
            ,{
              Header: 'Tipo',
              accessor: 'tipo'
            },{
              Header: 'Disciplina',
              accessor: 'disciplina',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return this.state.data.filter( data_row => data_row.modalidade.toUpperCase().indexOf(text) !== -1);},
              filterAll: true
            },{
              Header: 'Data',
              accessor: 'data',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return this.state.data.filter( data_row => data_row.dia.toUpperCase().indexOf(text) > -1);},
              filterAll: true
            },{
              Header: 'Local',
              accessor: 'local',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return this.state.data.filter( data_row => data_row.local.toUpperCase().indexOf(text) !== -1);},
              filterAll: true
            },{
              Header: 'Resultado(s)',
              accessor: 'resultado'
            },{
              Header: 'Classificação',
              accessor: 'classificacao'
            },
            {
              Header: 'Gerar Notícia',
              Cell: row => (
              <div className="text-center">
                  <News component={row}/>
              </div>
            ),
            filterable:false,
            }
      ]
    }
  }

  componentDidMount(){

    axios.get(`http://localhost:3000/api/Atleta/ultimosResultados`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
        .then(response => {
          
          this.setState({
            data: response.data,
          })
        })
        .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="container-fluid mb-4">
        <ReactTable
          filterable
          data={this.state.data}
          columns={this.state.cols}
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </div>

    );
  }
}

export default UltimosResultados;
