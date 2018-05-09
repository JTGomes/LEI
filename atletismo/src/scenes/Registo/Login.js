import React from 'react';
import ReactDOM from 'react-dom';
import { Link, WrappedLink } from 'react-router-dom'
//import './css/login.css'

class Login extends React.Component {

  state = {
    email: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    const response = this.props.mutate({
        variables: this.state,
    });
    console.log(response);
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
                onChange = {e => this.onChange(e)}
                value = {this.state.email}
                />
            </p>    
            <p>
            <label className="titles">Password</label>
              <input
                name = "password"
                type="password"
                placeholder="Password"
                onChange = {e => this.onChange(e)}
                value = {this.state.password}
                 />
            </p>
            <p>
            <Link to='../../atleta/Dados/index'>
              <input onClick = {() => this.onSubmit()}
                type="submit"
                value="Login" />
            </Link>
            </p>
          </form>

          <div className="text-center">
          <Link to="/Choose">
            <a className="d-block small mt-3">Registar Conta</a>
          </Link><br/>
            <a className="d-block small">Esqueceu-se da Password?</a>
          </div>

          </div>
    );
  }
}

export default Login;
