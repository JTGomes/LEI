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
        { link: '/', icon: <User className="icon" />, text: 'Dados Treinador'},
        { link: routes.TATLETA, icon: <RunIcon className="icon" />, text: 'Meus Atletas'},
        { link: routes.TRESULTADOS, icon: <Provas className="icon" />, text: 'Resultados'},
        { link: routes.TCALENDARIO, icon: <Calendar className="icon"/>, text: 'Calendário'},
      ],
    }
  }

  render() {
    return (

      <div >
        <NavBar sidebarLinks={this.state.sidebarLinks} />
        <div className="content-wrapper">
          <Switch>
            <Route exact path={'/'} component={TPersonalDataFrame}/>
            <Route exact path={routes.TATLETA} component={TPlayersFrame}/>
            <Route exact path={routes.TRESULTADOS} component={TResultsFrame}/>
            <Route exact path={routes.TCALENDARIO} component={TRCalenderFrame}/>
          </Switch>
        </div>
      </div>

    );
  }
}

export default AppTreinador;
