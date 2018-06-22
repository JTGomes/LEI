import React from 'react';
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
function Calendar(props) {
  //console.log(moment);
  return(
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
      style={{ height: "90vh" }}
    />
    </div>
  );
}

export default Calendar;
