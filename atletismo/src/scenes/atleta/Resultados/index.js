import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Selection from '../../../components/Selection'
import './Results.css';

//definir nome das colunas a aparecer na tabela
//accessor equivale ao campo ao qual a coluna corresponde
const col = [{
  Header: 'Prova',
  accessor: 'prova'
},{
  Header: 'Tipo',
  accessor: 'tipo'
},{
  Header: 'Modalidade',
  accessor: 'modalidade'
},{
  Header: 'Data',
  accessor: 'dia'
},{
  Header: 'Local',
  accessor: 'local'
},{
  Header: 'Resultado(s)',
  accessor: 'resultado'
},{
  Header: 'Classificação',
  accessor: 'classificacao'
}];

class Results extends React.Component {
  state = {
    data: [{
      prova: 'Jogos Olímpicos',
      tipo: 'Coletivo',
      modalidade: '4x100m',
      dia: '19/08/2016',
      local: 'Rio de Janeiro',
      resultado: 37.27,
      classificacao: 1
    },{
      prova: 'Jogos Olímpicos',
      tipo: 'Individual',
      modalidade: '200m',
      dia: '18/08/2016',
      local: 'Rio de Janeiro',
      resultado: 19.78,
      classificacao: 1
    }]
  }

  render() {
    return(
      <div className="results">
      <ReactTable
        data={this.state.data}
        columns={col}
        defaultPageSize={5}
      />
      </div>
    );
  }
}

export default Results;
