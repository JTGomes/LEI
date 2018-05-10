import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import News from './components/News'
const data =[{
      nome: 'José João Almeida',
      prova: 'Jogos Olímpicos',
      tipo: 'Coletivo',
      modalidade: '4x100m',
      dia: '19/08/2016',
      local: 'Rio de Janeiro',
      resultado: 37.27,
      classificacao: 1
    },{
      nome: 'Pedro Rangel Henriques',
      prova: 'Jogos Olímpicos',
      tipo: 'Individual',
      modalidade: '200m',
      dia: '18/08/2016',
      local: 'Rio de Janeiro',
      resultado: 19.78,
      classificacao: 1
    }]
class UltimosResultados extends Component {
  constructor(props) {
   super(props);

   //this.toggle = this.toggle.bind(this);
   this.state = {
     modalNew: false,
     uid: undefined,
     nome: undefined,
     prova: undefined,
     data: undefined,
     local: undefined,
     especialidade: undefined,
     resultado: undefined,
     classificacao: undefined,
   };
 }


  render() {

    return (
      <div className="container-fluid mb-4">
        <ReactTable
          data={data}
          columns={
            [{
              Header: 'Nome',
              accessor: 'nome'
            },{
              Header: 'Prova',
              accessor: 'prova'
            }
            ,{
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
            },
            {
              Header: 'Gera Notícia',
              Cell: row => (
              <News component={row}/>
              )
            }

          ]
          }
          defaultPageSize={10}
        />

      </div>

    );
  }
}

export default UltimosResultados;
