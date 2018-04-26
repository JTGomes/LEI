import React from 'react';
import BigCalendar from 'react-big-calendar';
//devolve o formato de data necessário para o calendario
import moment from 'moment';
//localização em pt-pt
import 'moment/locale/pt'
import 'react-big-calendar/lib/css/react-big-calendar.css';


moment.locale('pt');
//necessário para que o calendario funcione
BigCalendar.momentLocalizer(moment);


class TRCalenderFrame extends React.Component {
  render() {
    return (
      <div>
          <div className="calendar">
              <BigCalendar
                  events={[
                      {
                          start: new Date(),
                          end: new Date(moment().add(1, "days")),
                          title: "Competição Europeia"
                      }
                  ]}
                  defaultView="month"
                  style={{ height: "80vh" }}
              />
          </div>
      </div>
    );
  }
}

export default TRCalenderFrame