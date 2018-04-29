import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import NavBar from './NavBar'
import Home from '../scenes/diretor/Home';
import Registos from '../scenes/diretor/Registo';
import RunIcon from 'react-icons/lib/md/directions-run';
import TieIcon from 'react-icons/lib/fa/black-tie';
import Trophy from 'react-icons/lib/fa/trophy';
import Registo from 'react-icons/lib/fa/user-plus';
import HomeIcon from 'react-icons/lib/fa/home';


class AppDiretor extends Component {

  constructor(props){
    super(props);
    this.state={
      sidebarLinks: [
                      { link: routes.HOMEDIRETOR, icon: <HomeIcon className="icon" />, text: 'Home Page'},
                      { link: routes.REGISTOS, icon: <Registo className="icon"/>, text: 'Registos Pendentes'},
                      { link: '/alfredo', icon: <RunIcon className="icon" />, text: 'Gestão Atletas'},
                      { link: '/alfredo', icon: <TieIcon className="icon" />, text: 'Gestão Treinadores'},
                      { link: '/alfredo', icon: <Trophy className="icon"/>, text: 'Últimos resultados'}
                    ],
    }
  }


  render() {
    return (

        <div >
          <NavBar sidebarLinks={this.state.sidebarLinks} />
          <div className="content-wrapper">
            <Switch>
              <Route exact path={routes.HOMEDIRETOR} component={Home} />
              <Route exact path={routes.REGISTOS} component={Registos} />
            </Switch>
          </div>
        </div>
    
    );
  }
}

export default AppDiretor;
