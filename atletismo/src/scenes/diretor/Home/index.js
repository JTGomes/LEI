import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {ListGroup , ListGroupItem} from 'reactstrap';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
const products = [{id : "Setembro", name : 'Júlio', price: 100},{id : "Março", name : 'Júlio Dias', price: 10}];
import { Table, Button } from 'reactstrap';

class Home extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div class="row">
        <div className="col-lg-12">
          <h1>Pagamentos Pendentes</h1>
        </div>
      </div>
        <hr/>
          <Table striped>
              <thead>
              <tr>
                  <th>Nome</th>
                  <th>Mês(es) em atraso</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
              { products.map( (value) => ( <tr>
                                 <th scope="row">{value.name}</th>
                                 <td> {value.id} </td>
                                 <td><Button color="danger">Pago</Button></td>
                         </tr>))
              }
              </tbody>
          </Table>
         <br/>
         <div class="row">
           <div class="col-lg-12">
             <h1>Exames Médicos em Falta</h1>
           </div>
        </div>
        <hr/>
        <ListGroup>
            <ListGroupItem tag="a" href="#" action>Justina Costa Rogriguez</ListGroupItem>
            <ListGroupItem tag="a" href="#" action>Ana Tereza </ListGroupItem>
        </ListGroup>
        <br/>
        <div class="row">
          <div class="col-lg-12">
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
