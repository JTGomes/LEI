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
              id:'nome_competicao',
              accessor: b => b.user.nome_competicao,
            },{
              Header: 'Prova',
              accessor: 'nome'
            }
            ,{
              Header: 'Tipo',
              accessor: 'tipo'
            },{
              Header: 'Disciplina',
              accessor: 'disciplina'
            },{
              Header: 'Data',
              accessor: 'data'
            },{
              Header: 'Local',
              accessor: 'local'
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

    axios.get(`http://localhost:3000/api/resultados/getUltimosResultados`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
        .then(response => {

          this.setState({
            data: response.data,
          })
          console.log(this.state.data);
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
