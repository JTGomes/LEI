import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Alert, Collapse, Card, CardBody,Form,FormGroup, Label, Input} from 'reactstrap';
import Check from 'react-icons/lib/fa/check';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const data = [{mes:9, dataPagamento: '02/09/2017', quantia: 10},
              {mes:10, dataPagamento:'03/10/2017', quantia: 10},
              {mes:11, dataPagamento:'06/11/2017', quantia: 10},
              {mes:12, dataPagamento:'02/12/2017', quantia: 10},
              ]


class ModalPagamento extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state={
      meses:[
        {id:1,mes:'janeiro'},{id:2,mes:'fevereiro'},{id:3,mes:'março'},
        {id:4,mes:'abril'},{id:5,mes:'maio'},{id:6,mes:'junho'},
        {id:7,mes:'julho'},{id:9,mes:'setembro'},{id:10,mes:'outubro'},
        {id:11,mes:'novembro'},{id:12,mes:'dezembro'},
      ],
      collapse: false,
      value: [],
      quantia: '',
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleSelectChange (value) {
    this.setState({ value });
  }


  getMes(mes){
    return this.state.meses.find((obj)=>obj.id===mes).mes;
  }

  showPagamentosEfetuados(data){
    return  data.map( (pagamento,elem) =>
    <div key={elem} className="col-6">
      <p className="mb-0"><small><Check />{this.getMes(pagamento.mes)}</small></p>
      <p className="mt-0 mb-0"><small>{"Pago a "+pagamento.dataPagamento}</small></p>
      <p className="mt-0"><small>{"Quantia "+pagamento.quantia+" €"}</small></p>
    </div>
  );
}


getOptions(){
  return  this.state.meses.map((obj,elem) =>
  data.find((el)=> obj.id === el.id ) ? null :
  {value:obj,label:obj.mes}
);
}

showPagamento(data){
  if(data.length===11){
    return(
      <div className="col-12">
        <Alert color="success">
          Todas as mensalidades foram pagas.
        </Alert>
      </div>);
    }
    const { value } = this.state;
    return(
      <Select
        closeOnSelect={false}
        multi
        onChange={(value)=>this.handleSelectChange(value)}
        placeholder="Selecione os meses para pagamento"
        removeSelected={true}
        value={value}
        options={this.getOptions()}
        />);

      }


      render() {


        return (
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader toggle={this.props.toggle}>Pagamentos</ModalHeader>
            <ModalBody>
              {this.showPagamento(data)}
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
                      {this.showPagamentosEfetuados(data)}
                    </div>
                  </CardBody>
                </Card>
              </Collapse>

            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={()=>this.setEquipamento()}><Check />{' '}Validar</Button>{' '}
                <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
              </ModalFooter>
            </Modal>
          );
        }
      }




      export default ModalPagamento;
