import React, { Component } from 'react';
import * as routes from '../../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import SideBar from './components/SideBar';
import logo from '../../images/logo.png';
import Notificacao from './components/Notificacao';
import LogoutIcon from 'react-icons/lib/fa/sign-out'
import './style.css'
import { userActions } from '../../actions/userActions';
import { connect } from 'react-redux';

class NavBar extends Component{

logout(){
  this.props.dispatch(userActions.logoutUser());
}

  render(){

    return(
      <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <Link to={ routes.HOME } className="navbar-brand"><img src={logo} alt='logo braga' with="30px" height="27px" style={{margin:"0 5px 0 0"}}/>S.C. Braga</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse justify-content-end "} id="navbarSupportedContent">
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item" style={{margin:"0 5px"}}>
              <Notificacao />
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-light" onClick={()=> this.logout()}>
                <LogoutIcon style={{margin:'0 5px 0 0'}}/>
                Logout
              </button>
            </li>
          </ul>
          <SideBar sidebarLinks={this.props.sidebarLinks} />
        </div>
      </nav>
      </div>
      );
    }
  }




export default withRouter(connect(null)(NavBar));
