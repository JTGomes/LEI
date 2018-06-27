import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import NavBar from './NavBar';
import User from 'react-icons/lib/fa/user';
import Provas from 'react-icons/lib/fa/trophy';
import Calendar from 'react-icons/lib/fa/calendar';
import RunIcon from 'react-icons/lib/md/directions-run';
import TPersonalDataFrame from '../scenes/treinador/TPersonalDataFrame.js';
import TPlayersFrame from '../scenes/treinador/TPlayersFrame.js';
import TResultsFrame from '../scenes/treinador/TResultsFrame.js';
import TRCalenderFrame from '../scenes/treinador/TRCalenderFrame.js';
import TOtherFrame from '../scenes/treinador//TOtherFrame.js';
import AppAtleta from './AppAtleta';


class AppTreinador extends Component {
  constructor(props){
    super(props);
    this.state={
      sidebarLinks: [
        { link: `/treinador/${this.props.match.params.id}`, icon: <User className="icon" />, text: 'Dados Treinador'},
        { link: `/treinador/${this.props.match.params.id}/gestaoAtletas`, icon: <RunIcon className="icon" />, text: 'Meus Atletas'},
        { link: `/treinador/${this.props.match.params.id}/resultados`, icon: <Provas className="icon" />, text: 'Resultados'},
        { link: `/treinador/${this.props.match.params.id}/calendario`, icon: <Calendar className="icon"/>, text: 'Calendário'},
      ],
    }
  }

  render() {
    const { match: { params } } = this.props;
    return (

      <div >
        <NavBar sidebarLinks={this.state.sidebarLinks} />
        <div className="content-wrapper">
          <Switch>
            <Route exact path={`/treinador/${params.id}`} component={() => <TPersonalDataFrame param={params.id}/>} />
            <Route exact path={`/treinador/${params.id}/gestaoAtletas`} component={() => <TPlayersFrame param={params.id}/>} />
            <Route exact path={`/treinador/${params.id}/resultados`} component={() => <TResultsFrame param={params.id}/>} />
            <Route exact path={`/treinador/${params.id}/calendario`} component={() => <TRCalenderFrame param={params.id}/>} />
          </Switch>
        </div>
      </div>

    );
  }
}

export default AppTreinador;
