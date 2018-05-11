import React, { Component } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Input, Form, FormGroup, Label} from 'reactstrap';
import Check from 'react-icons/lib/fa/check';

class ModalEquipamento extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }


  setEquipamento(){

  }

  render() {

    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Selecione o equipamento entregue</ModalHeader>
        <ModalBody>
          <form>
            <div className="row">
              <div className="col-6" id="labelado">
                <div className="custom-control custom-checkbox ">
                  <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                  <label className="custom-control-label" for="customCheck1">Fato de treino</label>
                </div>
                <div className="custom-control custom-checkbox ">
                  <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                  <label className="custom-control-label" for="customCheck2">Polo</label>
                </div>
                <div className="custom-control custom-checkbox ">
                  <input type="checkbox" className="custom-control-input" id="customCheck3"/>
                  <label className="custom-control-label" for="customCheck3">Lycras (calções e calças)</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck4"/>
                  <label className="custom-control-label" for="customCheck4">Impermeável</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck5"/>
                  <label className="custom-control-label" for="customCheck5">Mochila</label>
                </div>
              </div>
              <div className="col-6">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck6"/>
                  <label className="custom-control-label" for="customCheck6">Calções passeio</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck7"/>
                  <label className="custom-control-label" for="customCheck7">T-shirts</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck8"/>
                  <label className="custom-control-label" for="customCheck8">Sapatilhas</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck9"/>
                  <label className="custom-control-label" for="customCheck9">Kispo</label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck0"/>
                  <label className="custom-control-label" for="customCheck0">Equipamento de competição</label>
                </div>
              </div>
            </div>
          </form>
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
