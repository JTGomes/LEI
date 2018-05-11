import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import NavBar from './NavBar'
import Home from '../scenes/diretor/Home';
import Registos from '../scenes/diretor/Registo';
import GestaoAtletas from '../scenes/diretor/GestaoAtletas';
import GestaoTreinador from '../scenes/diretor/GestaoTreinador';
import AntigosAtletas from '../scenes/diretor/AntigosAtletas';
import UltimosResultados from '../scenes/diretor/UltimosResultados';
import RunIcon from 'react-icons/lib/md/directions-run';
import TieIcon from 'react-icons/lib/fa/black-tie';
import Trophy from 'react-icons/lib/fa/trophy';
import Registo from 'react-icons/lib/fa/user-plus';
import HomeIcon from 'react-icons/lib/fa/home';
import ExAtletasIcon from 'react-icons/lib/fa/leanpub';

class AppDiretor extends Component {

  constructor(props){
    super(props);
    this.state={
      sidebarLinks: [
                      { link: routes.DIRETOR, icon: <HomeIcon className="icon" />, text: 'Home Page'},
                      { link: routes.REGISTOS, icon: <Registo className="icon"/>, text: 'Registos Pendentes'},
                      { link: routes.G_ATLETAS, icon: <RunIcon className="icon" />, text: 'Gestão Atletas'},
                      { link: routes.G_TREINADOR, icon: <TieIcon className="icon" />, text: 'Gestão Treinadores'},
                      { link: routes.LASTRESULTS , icon: <Trophy className="icon"/>, text: 'Últimos resultados'},
                      { link: routes.EXATLETAS , icon: <ExAtletasIcon className="icon"/>, text: 'Antigos Atletas'},
                    ],
    }
  }


  render() {
    return (

        <div >
          <NavBar sidebarLinks={this.state.sidebarLinks} />
          <div className="content-wrapper">
            <Switch>
              <Route exact path={routes.DIRETOR} component={Home} />
              <Route exact path={routes.REGISTOS} component={Registos} />
              <Route exact path={routes.G_ATLETAS} component={GestaoAtletas} />
              <Route exact path={routes.G_TREINADOR} component={GestaoTreinador} />
              <Route exact path={routes.EXATLETAS} component={AntigosAtletas} />
              <Route exact path={routes.LASTRESULTS} component={UltimosResultados} />
            </Switch>
          </div>
        </div>

    );
  }
}

export default AppDiretor;
