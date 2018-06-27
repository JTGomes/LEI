import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Line} from 'react-chartjs-2';
import './Performance.css';

class Performance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userId,
      datas: [],
      chartData: {
        labels: [],
        datasets: []
      }
    }
  }

  getAtletaId() {

    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Atleta?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          return response.data[0].id;
      })
      .catch(error => console.log(error))
  }

  getPerformance() {
    return this.getAtletaId().then(data => {
    return axios.get(`http://localhost:3000/api/Atleta/${data}/resultados`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          return response.data
      })
      .catch(error => console.log(error))
    });
  }

  componentDidMount() {
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }
    this.getPerformance().then(dados => {
      var tempos = [];
      for(let i = 0; i < dados.length; i++) {
        tempos = tempos.concat(dados[i].resultado);
        var novoDataset = {
            label:'Segundos',
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderJoinStyle: 'miter',
            data: tempos,
        }
        this.setState({
          ...this.state,
          chartData: {
            ...this.state.chartData,
            labels: this.state.chartData.labels.concat(dados[i].data),
            datasets: [novoDataset],
          }
        });
      }
      console.log(this.state.chartData);
    });
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
    </div>
  );
}
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(Performance);
