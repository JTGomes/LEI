import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import NavBar from './NavBar'
import Home from '../scenes/diretor/Home';
import User from 'react-icons/lib/fa/user';
import Provas from 'react-icons/lib/fa/trophy';
import Calendar from 'react-icons/lib/fa/calendar';
import RunIcon from 'react-icons/lib/md/directions-run';

class AppTreinador extends Component {
  constructor(props){
    super(props);
    this.state={
      sidebarLinks: [
        { link: routes.HOME, icon: <User className="icon" />, text: 'Dados Treinador'},
        { link: '/alfredo', icon: <RunIcon className="icon" />, text: 'Meus Atletas'},
        { link: '/alfredo', icon: <Provas className="icon" />, text: 'Resultados'},
        { link: '/alfredo', icon: <Calendar className="icon"/>, text: 'Calendário'}
      ],
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div >
          <NavBar sidebarLinks={this.state.sidebarLinks} />
          <div className="content-wrapper">
            <Switch>

            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppTreinador;
