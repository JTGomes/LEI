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
        { link: routes.HOME, icon: <User className="icon" />, text: 'Dados Treinador'},
        { link: '/atletas', icon: <RunIcon className="icon" />, text: 'Meus Atletas'},
        { link: '/resultados', icon: <Provas className="icon" />, text: 'Resultados'},
        { link: '/calendario', icon: <Calendar className="icon"/>, text: 'Calendário'},
      ],
    }
  }

  render() {
    return (

      <div >
        <NavBar sidebarLinks={this.state.sidebarLinks} />
        <div className="content-wrapper">
          <Switch>
            <Route exact path={routes.HOME} component={TPersonalDataFrame}/>
            <Route exact path={'/atletas'} component={TPlayersFrame}/>
            <Route exact path={'/resultados'} component={TResultsFrame}/>
            <Route exact path={'/calendario'} component={TRCalenderFrame}/>
          </Switch>
        </div>
      </div>

    );
  }
}

export default AppTreinador;
