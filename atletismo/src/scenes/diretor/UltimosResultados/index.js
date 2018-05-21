import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import News from './components/News';
//import matchSorter from 'match-sorter'

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
    }];
class UltimosResultados extends Component {


  filter_data_byName(data, input){
          const text = input.toUpperCase();
          return data.filter( data_row => data_row.nome.toUpperCase().indexOf(text) !== -1);
   }

  render() {

    return (
      <div className="container-fluid mb-4">
        <ReactTable
          filterable
          data={data}
          columns={
            [{
              Header: 'Nome',
              accessor: 'nome',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return data.filter( data_row => data_row.nome.toUpperCase().indexOf(text) !== -1);},
              filterAll: true
            },{
              Header: 'Prova',
              accessor: 'prova',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return data.filter( data_row => data_row.prova.toUpperCase().indexOf(text) !== -1);},
              filterAll: true
            }
            ,{
              Header: 'Tipo',
              accessor: 'tipo'
            },{
              Header: 'Modalidade',
              accessor: 'modalidade',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return data.filter( data_row => data_row.modalidade.toUpperCase().indexOf(text) !== -1);},
              filterAll: true
            },{
              Header: 'Data',
              accessor: 'dia',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return data.filter( data_row => data_row.dia.toUpperCase().indexOf(text) > -1);},
              filterAll: true
            },{
              Header: 'Local',
              accessor: 'local',
              filterMethod: (filter, rows) =>{   const text = filter.value.toUpperCase();
                return data.filter( data_row => data_row.local.toUpperCase().indexOf(text) !== -1);},
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
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </div>

    );
  }
}

export default UltimosResultados;
