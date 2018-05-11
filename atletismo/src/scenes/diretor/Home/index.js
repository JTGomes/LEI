import React, { Component } from 'react';
import Exames from './components/Exames';
import Pagamentos from './components/Pagamentos'



class Home extends Component {


  render() {

    return (
      <div className="container-fluid mb-4">
        <div className="row">
        <div className="col-lg-12">
          <h1>Pagamentos Pendentes</h1>
        </div>
      </div>
      <Pagamentos />
         <br/>
         <div className="row mt-4 mb-3">
           <div className="col-lg-12">
             <h1>Exames Médicos em Falta</h1>
           </div>
        </div>
        <Exames />
      </div>

    );
  }
}

export default Home;
