import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import BigCalendar from 'react-big-calendar';
//devolve o formato de data necessário para o calendario
import moment from 'moment';
//localização em pt-pt
import 'moment/locale/pt'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

//moment usado para definir a data no calendario
//define as datas para as nomenclaturas portuguesas
moment.locale('pt');
//necessário para que o calendario funcione
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

//evento passado pode ser por props...
class Calendar extends React.Component {
    constructor(props){
    super(props);
    this.state = {
      info: [],
      eventos: []
    }
  }

  getAtletaId(){
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

  constroiCalendario() {
    let url = this.props.userId;

    if(this.props.param) {
      url = this.props.param;
    }
    return this.getAtletaId().then(data => {
      return axios.get(`http://localhost:3000/api/eventos?filter[where][atleta]=${data}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
          .then(response => {
              return response.data
          })
          .catch(error => console.log(error))
        });
  }

  componentDidMount() {
    this.constroiCalendario().then(data => {
      for(let i = 0; i < data.length; i++) {

        var event = {
          start: new Date(data[i].ano, (data[i].mes) - 1, data[i].dia),
          end: new Date(data[i].ano, (data[i].mes) - 1, data[i].dia),
          title: data[i].evento
        };
        console.log(event);
        this.setState({

          eventos: this.state.eventos.concat(event)

        });
        console.log(this.state.eventos);
      }
    });
  }
  
  render() {
    return(
      <div className="calendar container-fluid">
        <BigCalendar
        events={this.state.eventos}
        defaultDate={new Date()}
        defaultView="month"
        style={{ height: "90vh" }}
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


export default connect(mapStateToProps)(Calendar);
