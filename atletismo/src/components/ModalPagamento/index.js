import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Alert, Collapse, Card, CardBody,Form,FormGroup, Label, Input} from 'reactstrap';
import Check from 'react-icons/lib/fa/check';
import Select from 'react-select';
import axios from 'axios';
import {connect} from 'react-redux';
import 'react-select/dist/react-select.css';


class ModalPagamento extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state={
      meses:[],
      collapse: false,
      value: [],
      quantia: '',
      data: []
    }
  }


  componentDidMount(){
    axios.post('http://localhost:3000/api/Pagamentos/getPagamentos',
               { userId: this.props.user }
            ,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
    .then(response => {
        let meses=[{value: 'janeiro', label: 'janeiro'}, {value: 'fevereiro', label: 'fevereiro'},
                  {value: 'março', label: 'março'},{value: 'abril', label: 'abril'} ,{value: 'maio', label:'maio'},
                  {value: 'junho',label: 'junho'}, {value: 'julho', label: 'julho'}, {value: 'setembro', label: 'setembro' },
                  {value: 'outubro', label: 'outubro'},{value: 'novembro', label: 'novembro'}, {value: 'dezembro', label: 'dezembro'}];
                  meses = meses.filter(pair => !response.data.some(e => e.mes === pair.label  ) )
        this.setState({
          data: response.data,
          meses: meses
        })
    })
    .catch(error => console.log(error))
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleSelectChange (value) {
    this.setState({ value });
  }




  showPagamentosEfetuados(){
    return  this.state.data.map( (pagamento,elem) =>
    <div key={elem} className="col-6">
      <p className="mb-0"><small><Check />{pagamento.mes}</small></p>
      <p className="mt-0 mb-0"><small>{"Pago a "+pagamento.data}</small></p>
      <p className="mt-0"><small>{"Quantia "+pagamento.quantia+" €"}</small></p>
    </div>
  );
}

EfetuaPagamento(){
  if(this.state.value.length === 0){
    return
  }
  axios.post('http://localhost:3000/api/Pagamentos/EfetuarPagamento',
    {quantia: this.state.quantia,
    userId: this.props.user,
    meses: this.state.value.map(e => e.label)}
    ,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
  .then(resp => this.props.toggle() )
  .catch(error => console.log(error))
}


showPagamento(){
    const { value } = this.state;
    return(
      <Select
        closeOnSelect={false}
        multi
        onChange={(value)=>this.handleSelectChange(value)}
        placeholder="Selecione os meses para pagamento"
        removeSelected={true}
        value={value}
        options={this.state.meses}
        />);

      }


      render() {


        return (
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle}>Pagamentos</ModalHeader>
            <ModalBody>
              {this.showPagamento(this.state.data)}
              <Form className="mt-4">
                <FormGroup>
                    <Label for="exampleNumber">Quantia mensal</Label>
                    <Input type="number" name="number" id="exampleNumber" placeholder="mensalidade" onChange={(event)=>this.setState({quantia:event.target.value})}/>
                </FormGroup>
              </Form>
              <div className="row mt-2 pl-2">
                <Button outline color="primary" onClick={this.toggle} size="sm" >Ver pagamentos efetuados</Button>
              </div>
              <Collapse isOpen={this.state.collapse}>
                <Card>
                  <CardBody>
                    <div className="row">
                      {this.showPagamentosEfetuados()}
                    </div>
                  </CardBody>
                </Card>
              </Collapse>

            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={()=>this.EfetuaPagamento()}><Check />{' '}Validar</Button>{' '}
                <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
              </ModalFooter>
            </Modal>
          );
        }
      }

      function mapStateToProps(state){
        return {
          token: state.token
        };
      }



      export default connect(mapStateToProps)(ModalPagamento);
