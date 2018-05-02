import React, { Component } from 'react';
import Atleta from './components/Atletas';
import Treinador from './components/Treinadores'

class Registo extends Component {


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1>Atletas que aguardam validação</h1>
          </div>
        </div>
        <br/>
        <Atleta />
          <div className="row mt-5">
            <div className="col-lg-12">
              <h1>Treinadores que aguardam validação</h1>
            </div>
          </div>
          <br/>
          <Treinador />

        </div>

    );
  }
}

export default Registo;
