import React from 'react';
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
      modalEvents: false
    }
    this.toggleE = this.toggleE.bind(this);
  }

  toggleE(){
    this.setState({
      modalEvents: !this.state.modalEvents
    })
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
        <ModalEvents modalEvents={this.state.modalEvents} toggle={this.toggleE}/>
      </div>
    );
  }
}

export default TRCalenderFrame;