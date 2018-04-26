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
              <Route  path={routes.DIRETOR} component={AppDiretor} />
              <Route  path={routes.ATLETA} component={AppAtleta} />
              <Route  path={routes.TREINADOR} component={AppTreinador} />
            </Switch>
      </BrowserRouter>
     </div>
    );
  }
}

export default App;
