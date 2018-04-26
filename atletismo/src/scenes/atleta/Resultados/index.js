import React from 'react';
import { Table } from 'reactstrap';
import Selection from '../../../components/Selection'
import './Results.css';

//possibilidade das opções serem dinamicas
//entradas da tabela podem ser preenchidas com um map de props passados...
function Results(props) {
  return(
    <div className="results">
      <Table size="sm" hover responsive>
        <thead>
          <tr>
            <th>Provas</th>
            <th>Tipo</th>
            <th>Modalidade</th>
            <th>Dia</th>
            <th>Local</th>
            <th>Resultado (s)</th>
            <th>Classificação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jogos Olímpicos</td>
            <td>Coletivo</td>
            <td>4x100m</td>
            <td>19/08/2016</td>
            <td>Rio de Janeiro</td>
            <td>37.27</td>
            <td>1º Lugar</td>
          </tr>
          <tr>
            <td>Jogos Olímpicos</td>
            <td>Individual</td>
            <td>200m</td>
            <td>18/08/2016</td>
            <td>Rio de Janeiro</td>
            <td>19.78</td>
            <td>1º Lugar</td>
          </tr>
        </tbody>
      </Table>
      <Selection
        name="Provas"
        items={["Nacionais","Regionais","Internacionais"]}
      />
      <Selection
        name="Modalidade"
        items={["4x100m","100m","200m"]}
      />
      <Selection
        name="Local"
        items={["Rio de Janeiro","Berlim"]}
      />
      <Selection
        name="Classificação"
        items={["1º","2º","3º","4º"]}
      />
    </div>
  );
}

export default Results;
