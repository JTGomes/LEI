import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Table } from 'reactstrap';
import {ListGroup , ListGroupItem} from 'reactstrap';
import Exames from './components/Exames';




class Home extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        <div className="col-lg-12">
          <h1>Pagamentos Pendentes</h1>
        </div>
      </div>
        <hr/>

         <br/>
         <div className="row">
           <div className="col-lg-12">
             <h1>Exames Médicos em Falta</h1>
           </div>
        </div>
        <hr/>
        <Exames />
        <br/>
        <div className="row">
          <div className="col-lg-12">
            <h1>Lesionados</h1>
          </div>
       </div>
       <hr/>
         <ListGroup>
           <ListGroupItem tag="a" href="#" action>Justina Costa Rogriguez</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Ana Tereza </ListGroupItem>
         </ListGroup>

      </div>

    );
  }
}

export default Home;
