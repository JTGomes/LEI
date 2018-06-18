import React, { Component } from 'react';
import AppDiretor from './AppDiretor';
import AppAtleta from './AppAtleta';
import AppTreinador from './AppTreinador';
import Login from '../scenes/Login';
import {connect} from 'react-redux';

class AppWrapper extends Component {


  render(){

    switch (this.props.userRole) {
      case 'Diretor':
        return <AppDiretor />
      case 'Atleta':
        return <AppAtleta />
      case 'Treinador':
        return <AppTreinador />
      default:
        return <Login />
    }
}

}

function mapStateToProps(state){
  return {
    userRole: state.userRole
  };
}


export default connect(mapStateToProps)(AppWrapper);
