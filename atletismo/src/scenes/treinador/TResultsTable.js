import React from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';


class TResultsTable extends React.Component {
  render() {
    return (
        <div>
          <ReactTable
            data={this.props.data}
            columns={[
              {
                Header: "Atleta",
                accessor: "nome"
              },
              {
                Header: "Nome da Competição",
                id: "nomeeCompeticao",
                accessor: d => d.nomeCompeticao,
              },
              {
                Header: "Ano",
                accessor: "ano"
              },
              {
                Header: "Modalidade",
                accessor: "modalidade"
              },
              {
                Header: "Posição",
                accessor: "posicao"
              },
              {
                Header: "Album",
                accessor: "album",
                Cell: row => (
                  <div className="table-album">
                    <a href={row} >
                      <img src="" alt={""} />
                    </a>
                  </div>
                )
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
    );
  }
}

export default TResultsTable;