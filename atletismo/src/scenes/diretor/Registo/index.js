import React, { Component } from 'react';
import Atleta from './components/Atletas';
import Treinador from './components/Treinadores';
import axios from 'axios';
import {connect} from 'react-redux';

class Registo extends Component {
constructor(props){
  super(props);
  this.state = {
  Atletas : [],
  Treinadores: []
  };
  this.removerAtleta = this.removerAtleta.bind(this);
  this.removerTreinador = this.removerTreinador.bind(this);

}

componentDidMount(){
  axios.get('http://localhost:3000/api/Users/getUsersNaoValidos', {headers:{'Authorization' : 'Bearer ' + this.props.token}})
    .then(response =>{
        this.setState({
          Atletas: response.data.Atletas,
          Treinadores: response.data.Treinadores
        })}
    )
    .catch(error =>
      console.log(error)
    )
}

  removerAtleta(id){
    this.setState(prevState => ({
      Atletas: prevState.Atletas.filter(user => user.user.id !== id)
    }));
  }

  removerTreinador(id){
    this.setState(prevState => ({
      Treinadores: prevState.Treinadores.filter(user => user.user.id !== id)
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
        <Atleta data ={this.state.Atletas} remover={this.removerAtleta}/>
          <div className="row mt-5">
            <div className="col-lg-12">
              <h1>Treinadores que aguardam validação</h1>
            </div>
          </div>
          <br/>
          <Treinador data = {this.state.Treinadores} remover={this.removerTreinador}/>

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
