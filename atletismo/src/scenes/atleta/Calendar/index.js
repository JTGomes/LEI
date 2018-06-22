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

  componentDidMount(){

    let url = this.props.userId;


    if(this.props.param) {
      url = this.props.param;
    }

    axios.get(`http://localhost:3000/api/eventos?filter[where][atleta]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
        .then(response => {
          this.setState({
            info: response.data
          })
        })
        .catch(error => console.log(error))
  }

  render() {

    return(
      <div className="calendar container-fluid">
        <BigCalendar
        events={[
          {
            start: new Date(2018, 5, 23),
            end: new Date(2018, 5, 23),
            title: this.state.info.evento,
          }
        ]}
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
