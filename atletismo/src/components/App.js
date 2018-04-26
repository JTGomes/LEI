import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import Home from '../scenes/diretor/Home';
import AppDiretor from './AppDiretor';
import AppAtleta from './AppAtleta';
import AppTreinador from './AppTreinador';
import Registo from '../scenes/Registo';
import Login from '../scenes/Login';


class App extends Component {
  // <Route exact path={routes.REGISTAR} component={Registo} />
  // <Route exact path={routes.ATLETA} component={AppAtleta} />
  // <Route exact path={routes.DIRETOR} component={AppDiretor} />
  // <Route exact path={routes.TREINADOR} component={AppTreinador} />
  // <Route exact path={routes.HOME} component={AppDiretor}/>
  render() {

    return (
      <BrowserRouter>
            <Switch>
              <Route  path={routes.DIRETOR} component={AppDiretor} />
              <Route  path={routes.ATLETA} component={AppAtleta} />
            </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
