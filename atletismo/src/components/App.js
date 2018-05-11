import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import AppDiretor from './AppDiretor';
import AppAtleta from './AppAtleta';
import Registo from '../scenes/Registo'
import AppTreinador from './AppTreinador';
import Login from '../scenes/Login';


class App extends Component {



  render() {

    return (
     <div>
        <div id="buttons">
             <a href="/treinador" target="_self">
                <button>
                    Treinador
                </button>
            </a>
             <a href="./atleta">
                <button>
                    Atleta
                </button>
            </a>
            <a href='./admin'>
                <button>
                    Dirigentes
                </button>
            </a>
        </div>
        <BrowserRouter>
          <Switch>
            <Route  exact path={routes.HOME} component={Login} />
            <Route  path={routes.DIRETOR} component={AppDiretor} />
            <Route  path={routes.ATLETA} component={AppAtleta} />
            <Route  path={routes.TREINADOR} component={AppTreinador} />
            <Route  path={routes.REGISTAR} component={Registo} />
          </Switch>
        </BrowserRouter>
     </div>
    );
  }
}

export default App;
