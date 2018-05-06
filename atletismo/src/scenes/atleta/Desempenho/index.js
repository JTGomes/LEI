import React from 'react';
import {Line} from 'react-chartjs-2';
import './Performance.css';

class Performance extends React.Component {
  //exemplo de dados. A serem passados de outro componente
  state = {
    chartData: {
      labels: ['01/03/2018', '06/03/2018', '15/03/2018', '20/03/2018', '03/04/2018', '23/04/2018'],
      datasets:[
        {
          label:'Segundos',
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderJoinStyle: 'miter',
          data:[
            10.5,
            11.1,
            9.8,
            10.2,
            10.1,
            9.7
          ]
        }
      ]
    }
  }
  //Line corresponde a um grafico de linhas. Outras opções, como um gráfico de barras estão disponíveis
  render() {
  return(
    <div className='chart'>
      <Line
        data={this.state.chartData}
        options={{
          maintainAspectRatio: true,
          elements: {
            line: {
              tension: 0, // disables bezier curves
            }
          },
          title:{
            display: 'Tempos',
            text: 'Registo dos Tempos de Provas',
            fontSize:25
          }
        }}
      />
      <a>Desde: </a>
      <select>
        <option>2018</option>
        <option>2017</option>
        <option>2016</option>
      </select>
      <a>Até: </a>
      <select>
        <option>2018</option>
        <option>2017</option>
        <option>2016</option>
      </select>
      <a>Filtro: </a>
      <select>
        <option>Todas</option>
        <option>100m</option>
        <option>200m</option>
        <option>300m</option>
      </select>
    </div>
  );
}
}

export default Performance;
