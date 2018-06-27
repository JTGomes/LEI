import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import AppDiretor from './AppDiretor';
import AppAtletaID from './AppAtletaID';
import AppTreinadorID from './AppTreinadorID';
import AppAtleta from './AppAtleta';
import Registo from '../scenes/Registo/Choose.js';
import AppTreinador from './AppTreinador';
import Login from '../scenes/Login';
import ErrorPage from '../scenes/ErrorPage';
import { history } from '../constants/history';
import {Atleta,Diretor,Treinador} from '../constants/Permissao';
import {connect} from 'react-redux';
import {userActions} from '../actions/userActions'


class App extends Component {
  constructor(props){
    super(props);
    this.checkAuth();
  }

  checkAuth(){
    const token = sessionStorage.getItem('jwtToken');
    if(token){
      this.props.dispatch(userActions.login_action(token));
    }
    // }else{
    //   this.props.dispatch(userActions.logoutUser())
    // }
  }

  getUserPage(){
    switch (this.props.userRole) {
      case 'Diretor':
        return <Route  path={routes.HOME} component={AppDiretor} />;
      case 'Atleta':
        return <Route  path={routes.HOME} component={AppAtleta} />;
      case 'Treinador':
        return <Route  path={routes.HOME} component={AppTreinador} />;
      default:
        return <Route exact path={routes.HOME} component={Login} />;
    }
  }

  render() {
    const UserPage = this.getUserPage();
    return (
     <div>
        <Router history={history}>
          <Switch>
            <Route  path='/treinador/:id' component={Diretor(AppTreinadorID)} />
            <Route  path='/atleta/:id' component={Treinador(AppAtletaID)} />
            <Route  exact path={routes.REGISTAR} component={Registo} />
              <Route  path={"/diretor/"} component={AppDiretor} />
            {UserPage}
            <Route  component={ErrorPage} />
          </Switch>
        </Router>
     </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userRole: state.userRole
  };
}


export default connect(mapStateToProps)(App);
