import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Alert, Collapse, Card, CardBody} from 'reactstrap';
import Check from 'react-icons/lib/fa/check';

const data = [{id:1, dataAdquirido: '02/09/2017'},
              {id:4, dataAdquirido:'25/09/2017'},
              {id:3, dataAdquirido:'16/09/2017'},
              {id:7, dataAdquirido:'12/09/2017'},
              ]


class ModalEquipamento extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state={
      equipamento:['Fato de treino','Sweatshirt','Polo',
                   'Lycras (calções e calças)','Impermeável',
                   'Mochila','Calções passeio','T-shirt',
                   'Sapatilhas', 'Kispo', 'Camisola de Competição'
                 ],
      collapse: false,
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  setEquipamento(){

  }

  showEquipamento(data){
    if(data.length===11){
      return(
        <div className="col-12">
          <Alert color="success">
            Todo o equipamento já foi entregue.
          </Alert>
        </div>);
    }
    return  this.state.equipamento.map( (equip,elem) =>
      data.find((obj)=> obj.id === elem)? null :
      <div key={elem} className="col-6">
        <div className="custom-control custom-checkbox ">
          <input type="checkbox" className="custom-control-input" id={"customCheck"+elem}/>
          <label className="custom-control-label" htmlFor={"customCheck"+elem}>{equip}</label>
        </div>
      </div>
    );
  }

  showEquipamentoAdquirido(data){
    return  data.map( (equip,elem) =>
      <div key={elem} className="col-6">
        <p className="mb-0"><small><Check />{this.state.equipamento[equip.id]}</small></p>
        <p className="mt-0"><small>{"Entregue a "+equip.dataAdquirido}</small></p>
      </div>
    );
  }

  render() {

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Selecione o equipamento entregue</ModalHeader>
        <ModalBody>
          <form>
            <div className="row">
            {this.showEquipamento(data)}
            </div>
          </form>
          <div className="row mt-2 pl-2">
              <Button outline color="primary" onClick={this.toggle} size="sm" >Ver equipamento entregue</Button>
          </div>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <div className="row">
                  {this.showEquipamentoAdquirido(data)}
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




export default ModalEquipamento;
