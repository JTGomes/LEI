import React from 'react';
import './css/login.css'

class Login extends React.Component {

  state={
    email: '',
    password: '',
  }

  onChange=(e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  onSubmit=(e) => {
    console.log(e);/*
    const response=this.props.mutate({
        variables: this.state,
    });
    console.log(response);*/
    this.props.onLogin(2);
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
           
              <input onClick={() => this.onSubmit()}
                type="submit"
                value="Login" />
           
            </p>
          </form>

          <div className="text-center">
            <a className="d-block small mt-3" onClick={this.props.criaConta}>Registar Conta</a>
          <br/>
            <a className="d-block small">Esqueceu-se da Password?</a>
          </div>
          </div>
    );
  }
}

export default Login;
