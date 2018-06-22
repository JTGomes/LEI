import React, { Component } from 'react';
import Atleta from './components/Atletas';
import Treinador from './components/Treinadores';
import axios from 'axios';
import {connect} from 'react-redux';

class Registo extends Component {
constructor(props){
  super(props);
  this.state = {
    users: []
  };
  this.remover = this.remover.bind(this);

}

componentDidMount(){
  axios.get('http://localhost:3000/api/Users/getUsersNaoValidos', {headers:{'Authorization' : 'Bearer ' + this.props.token}})
    .then(response =>{
        this.setState({
          users: response.data
        })}
    )
    .catch(error =>
      console.log(error)
    )
}

  remover(id){
    this.setState(prevState => ({
      users: prevState.users.filter(user => user.id !== id)
    }));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1>Atletas que aguardam validação</h1>
          </div>
        </div>
        <br/>
        <Atleta data ={this.state.users.filter(user => user.role==='Atleta')} remover={this.remover}/>
          <div className="row mt-5">
            <div className="col-lg-12">
              <h1>Treinadores que aguardam validação</h1>
            </div>
          </div>
          <br/>
          <Treinador data = {this.state.users.filter(user => user.role==='Treinador')} remover={this.remover}/>

        </div>

    );
  }
}

function mapStateToProps(state){
  return {
    token: state.token
  };
}

export default connect(mapStateToProps)(Registo);
