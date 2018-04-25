import React from 'react';
import './Results.css';

//possibilidade das opções serem dinamicas
//entradas da tabela podem ser preenchidas com um map de props passados...
function Results(props) {
  return(
    <div className="results">
      <a>Provas: </a>
      <select>
        <option>Nacionais</option>
        <option>Regionais</option>
        <option>Internacionais</option>
      </select>
      <a>Modalidade: </a>
      <select>
        <option>4x100m</option>
        <option>100m</option>
        <option>200m</option>
      </select>
      <a>Local: </a>
      <select>
        <option>Rio de Janeiro</option>
        <option>Berlim</option>
      </select>
      <a>Classificação: </a>
      <select>
        <option>1º</option>
        <option>2º</option>
        <option>3º</option>
        <option>4º</option>
      </select>
      <table className="resultsTable">
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
      </table>
    </div>
  );
}

export default Results;
