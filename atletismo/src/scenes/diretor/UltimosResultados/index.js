import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";
import DropDown from './components/dropdown';
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
          Header: 'Competição',
          accessor: 'nome'
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
          Header: 'Marca',
          accessor: 'resultado'
        },{
          Header: 'Classificação',
          accessor: 'classificacao'
        },
        {
          Header: 'Opções',
          Cell: row => (
          <div className="text-center">
            <DropDown row={row} update={this.editEntryTable} userData={row.original.user}/>
          </div>
        ),
        filterable:false,
        style:{overflow:'visible'},
        }
      ]
    }
    this.editEntryTable = this.editEntryTable.bind(this);
  }

  editEntryTable(d, index) {
    //console.log("This is the data test: ");
    //console.log(d);
    var newData = [];
    for(let i=0; i<this.state.data.length; i++) {
      if(index===i) newData.push(d);
      else newData.push(this.state.data[i]);
    }
    this.setState(
      {data: newData}
    );
  }

  componentDidMount(){
    axios.get(`http://localhost:3000/api/resultados/getUltimosResultados`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
        this.setState({
          data: response.data,
        })
        //console.log(this.state.data);
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
