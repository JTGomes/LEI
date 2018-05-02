import React, { Component } from 'react';
import Lesionados from './components/Lesionados';
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
        <br/>
        <div className="row">
          <div className="col-lg-12">
            <h1>Lesionados</h1>
          </div>
       </div>
       <hr/>
       <Lesionados />
      </div>

    );
  }
}

export default Home;
