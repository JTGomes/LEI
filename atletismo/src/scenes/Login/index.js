import React from 'react';
import * as routes from '../../constants/routes';
import {  Link } from 'react-router-dom';
import {Alert} from 'reactstrap';
import './css/login.css';
import { userActions } from '../../actions/userActions';
import { connect } from 'react-redux';


class Login extends React.Component {
constructor(props){
  super(props);
  this.state={
    email: '',
    password: '',
  }
}


  onChange=(e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  onSubmit=(event) => {
    event.preventDefault();
    const creds = this.state;
    const {dispatch} = this.props;
    if(creds.email && creds.password){
      dispatch(userActions.loginUser(creds))
    }
  }

  render () {
    return (
          <div className="login"><br/><br/><br/><br/><br/><br/><br/><br/>
          <h2 className="login-header">PLATAFORMA DE ATLETISMO DO SC BRAGA</h2>

          <form className="login-container">
            <p>
            <label className="titles">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={e => this.onChange(e)}
                value={this.state.email}
                />
            </p>
            <p>
            <label className="titles">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={e => this.onChange(e)}
                value={this.state.password}
                 />
            </p>
            <p>

              <input onClick={(event) => this.onSubmit(event)}
                type="submit"
                value="Login" />

            </p>
          </form>

          <div className="text-center">
            {this.props.error &&
              <Alert color="danger">
                 {this.props.error}
               </Alert>
               }

            <Link to={routes.REGISTAR} className="d-block small mt-3" style={{color:'#d14444'}}>Registar Conta</Link>
          <br/>
            <a className="d-block small">Esqueceu-se da Password?</a>
          </div>
          </div>
    );
  }
}

function mapStateToProps(state){
  return {
    error: state.errorMessage
  };
}


export default connect(mapStateToProps,null)(Login);
