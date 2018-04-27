import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ListGroup , ListGroupItem} from 'reactstrap';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
const products = [{id : 1, name : 'Júlio', price: 100},{id : 2, name : 'Júlio Dias', price: 10}];


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
          <BootstrapTable ref='table' data={ products } version='4' striped hover>
             <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true }>Product ID</TableHeaderColumn>
             <TableHeaderColumn dataField='name' dataSort={ true }>Product Name</TableHeaderColumn>
             <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
         </BootstrapTable>
         <br/>
         <div className="row">
           <div className="col-lg-12">
             <h1>Exames Médicos em Falta</h1>
           </div>
        </div>
        <hr/>
        <ListGroup>
          <ListGroupItem tag="a" href="#" action>Cras justo odio</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <br/>
        <div className="row">
          <div className="col-lg-12">
            <h1>Lesionados</h1>
          </div>
       </div>
       <hr/>
         <ListGroup>
           <ListGroupItem tag="a" href="#" action>Cras justo odio</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
         </ListGroup>
      </div>

    );
  }
}

export default Home;
