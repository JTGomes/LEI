import React from 'react';
import ReactTable from "react-table";
import Dropdown from './components/dropdown';
import "react-table/react-table.css";
import './Results.css';

//definir nome das colunas a aparecer na tabela
//accessor equivale ao campo ao qual a coluna corresponde  

class Results extends React.Component {
  state = {
    data: [{
      prova: 'Jogos Olímpicos',
      tipo: 'Coletivo',
      disciplina: '4x100m',
      dia: '19/08/2016',
      local: 'Rio de Janeiro',
      resultado: 37.27,
      classificacao: 1
    },{
      prova: 'Jogos Olímpicos',
      tipo: 'Individual',
      disciplina: '200m',
      dia: '18/09/2016',
      local: 'Rio de Fevereiro',
      resultado: 19.78,
      classificacao: 1
    }],

    col: [{
      Header: 'Prova',
      accessor: 'prova',
      filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
        return this.state.data.filter( data_row => data_row.prova.toUpperCase().indexOf(text) !== -1);},
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
      accessor: 'dia',
        filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
          return this.state.data.filter( data_row => data_row.dia.toUpperCase().indexOf(text) !== -1);},
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

  render() {
    return(
      <div className="results container-fluid">
      <ReactTable
        filterable
        data={this.state.data}
        columns={this.state.col}
        defaultPageSize={10}
      />
      </div>
    );
  }
}

export default Results;
