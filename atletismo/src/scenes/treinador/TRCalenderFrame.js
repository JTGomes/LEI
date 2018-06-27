import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import BigCalendar from 'react-big-calendar';
import { Button } from 'reactstrap';
import ModalEvents from './component/modalEvents';
//devolve o formato de data necessário para o calendario
import moment from 'moment';
//localização em pt-pt
import 'moment/locale/pt'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './css/TCalendarFrame.css';


moment.locale('pt');
//necessário para que o calendario funcione
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

//evento passado pode ser por props

class TRCalenderFrame extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalEvents: false,
      atletasTreinados: [],
    }
    this.toggleE = this.toggleE.bind(this);
  }

  toggleE(){
    this.setState({
      modalEvents: !this.state.modalEvents
    })
  }

  getTreinadorId () {

    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Treinadors?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
        return response.data[0].id;
      })
      .catch(error => console.log(error))
  }

  componentWillMount() {
    this.getTreinadorId().then(data => {

      axios.get(`http://localhost:3000/api/Treinadors/${data}/atletas`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
        for(let i = 0; i < response.data.length; i++) {

          this.setState({
            atletasTreinados: this.state.atletasTreinados.concat(response.data[i].id)
          })
        }
      })
      .catch(error => console.log(error))
    });

  }

  render() {
    return (
      <div className="calendar container-fluid">
        <BigCalendar
          events={[
            {
              start: new Date(),
              end: new Date(moment().add(1, "days")),
              title: "Competição Europeia"
            }
          ]}
          defaultDate={new Date()}
          defaultView="month"
          style={{ height: "80vh" }}
        />
        <Button onClick={this.toggleE}>Adicionar Evento</Button>
        <ModalEvents modalEvents={this.state.modalEvents} toggle={this.toggleE} atletas={this.state.atletasTreinados} />
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


export default connect(mapStateToProps)(TRCalenderFrame);