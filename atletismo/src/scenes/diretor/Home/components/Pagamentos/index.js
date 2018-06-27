import React, { Component } from 'react';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import {Button, Table, Alert, Form, FormGroup, Input } from 'reactstrap';
import ModalPagamento from '../../../../../components/ModalPagamento';
import axios from 'axios';
import {connect} from 'react-redux';

const data=[{nome:'João Luís Costa',uid:'uid',mes: ['janeiro','fevereiro','março'],},
            {nome:'Alfredo Lopes da Silva',uid:'uid',mes: ['fevereiro','março'],}]

class Pagamentos extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalUserInfo: false,
      uid: undefined,
      atletaid: undefined,
      modalPagamento: false,
      meses: undefined,
      input: '',
      data: []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleP = this.toggleP.bind(this);
  }


  toggle(){
    this.setState({
      modalUserInfo: !this.state.modalUserInfo,
    })
  }

  toggleP(){
    this.setState({
      modalPagamento: !this.state.modalPagamento,
    })
  }

componentDidMount(){
  axios.get('http://localhost:3000/api/Atleta/getPagamentosFalta',{headers:{'Authorization' : 'Bearer ' + this.props.token}})
  .then(response => {
    this.setState({data: response.data})
  })
  .catch(error => console.log(error))
}

  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }

  initModalPagamento(userID){
    this.setState({
      modalPagamento: true,
      atletaid: userID
    })
  }


  filter_data_byName(data){
          if(this.state.input===''){
            return data;
          }
          const text = this.state.input.toUpperCase();
          return data.filter( data_row => data_row.user.nome.toUpperCase().indexOf(text) !== -1);
   }

   handleInputSubmit(event) {
     this.setState({
       input: event.target.value
     });
   }

  getRow(obj,elem){
    return (<tr key={elem}>
             <td onClick={()=>this.initModalUser(obj)} style={{cursor:'pointer'}}>{obj.user.nome}</td>
             <td className="text-center">{obj.pagamento.map(pag => pag.mes).join(", ")}</td>
             <td className="text-center"><Button color="danger" onClick={()=>this.initModalPagamento(obj.id)}>Pago</Button></td>
           </tr>);
  }

  render() {
    return (
      <div className="mt-3" >
      {this.state.data.length>0?
        <div>
          <div className="row">
            <Form className="col-lg-3">
              <FormGroup>
                <Input type="text" name="searchbar" id="searchbar" value={this.state.input} placeholder="Pesquisar Atleta" onChange={event => this.handleInputSubmit(event)}/>
              </FormGroup>
            </Form>
          </div>
          <Table  responsive striped hover bordered>
            <thead >
              <tr>
                <th>Nome do Atleta</th>
                <th className="text-center">Meses em Atraso</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.filter_data_byName(this.state.data).map( (obj,elem) => this.getRow(obj,elem))}
            </tbody>
          </Table>
        </div>
        :
        <Alert color="success">
          Não há pagamentos pendentes
        </Alert>
      }
      {this.state.modalPagamento && <ModalPagamento isOpen={this.state.modalPagamento}  user={this.state.atletaid} toggle={this.toggleP}/>}
      <ModalUserInfo toggle={this.toggle} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
      </div>
    );
  }

}



function mapStateToProps(state){
  return {
    token: state.token
  };
}


export default connect(mapStateToProps)(Pagamentos);
