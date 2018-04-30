import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Table } from 'reactstrap';
import {ListGroup , ListGroupItem} from 'reactstrap';
import '../../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
<<<<<<< HEAD
import Exames from './components/Exames';
const products = [{id : 1, name : 'Júlio', price: 100},{id : 2, name : 'Júlio Dias', price: 10}];

=======
const products = [{id : "Setembro", name : 'Júlio', price: 100},{id : "Março", name : 'Júlio Dias', price: 10}];
import { Table, Button } from 'reactstrap';
>>>>>>> 9f251d55007bdb720c5abdd211b17090e1312e71

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
         <div className="row">
           <div className="col-lg-12">
             <h1>Exames Médicos em Falta</h1>
           </div>
        </div>
        <hr/>
<<<<<<< HEAD
        <Exames />
=======
        <ListGroup>
            <ListGroupItem tag="a" href="#" action>Justina Costa Rogriguez</ListGroupItem>
            <ListGroupItem tag="a" href="#" action>Ana Tereza </ListGroupItem>
        </ListGroup>
>>>>>>> 9f251d55007bdb720c5abdd211b17090e1312e71
        <br/>
        <div className="row">
          <div className="col-lg-12">
            <h1>Lesionados</h1>
          </div>
       </div>
       <hr/>
<<<<<<< HEAD
         <ListGroup className="mb-5">
           <ListGroupItem tag="a" href="#" action>Cras justo odio</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Morbi leo risus</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
=======
         <ListGroup>
           <ListGroupItem tag="a" href="#" action>Justina Costa Rogriguez</ListGroupItem>
           <ListGroupItem tag="a" href="#" action>Ana Tereza </ListGroupItem>
>>>>>>> 9f251d55007bdb720c5abdd211b17090e1312e71
         </ListGroup>

      </div>

    );
  }
}

export default Home;
