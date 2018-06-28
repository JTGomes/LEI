import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Alert, Collapse, Card, CardBody} from 'reactstrap';
import Check from 'react-icons/lib/fa/check';

const data = [{id:1},
              {id:4},
              {id:3},
              {id:7},
              ]


class ModalEquipamento extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state={
      equipamento:['Fato de Treino','Sapatilhas','Mochila',
                   'Camisola de Competição','Pólo',
                   'Calções de Passeio','Kispo','Sweatshirt',
                   'Lycras', 'Impermeável', 'T-Shirt'
                 ],
      collapse: false,
      adicionar: [],
      tem: []
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  setEquipamento(){

  }

  onChange(e) {
    // current array of options
    const options = this.state.adicionar
    let index

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      options.push(+e.target.name)
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = options.indexOf(+e.target.name)
      options.splice(index, 1)
    }

    // update the state with the new array of options
    this.setState({ adicionar: options })
  }

  showEquipamento(data){
    console.log("ESTE->" + data);
    if(data.length===11){
      return(
        <div className="col-12">
          <Alert color="success">
            Todo o equipamento já foi entregue.
          </Alert>
        </div>);
    }
    return  this.state.equipamento.map( (equip, elem) =>
      this.state.tem.find((obj)=> equip === (obj.nome) )? null :
      <div key={elem} className="col-6">
        <div className="custom-control custom-checkbox ">
          <input type="checkbox" name={equip} className="custom-control-input" id={"customCheck"+elem} onChange={this.onChange.bind(this)} />
          <label className="custom-control-label" htmlFor={"customCheck"+elem}>{equip}</label>
        </div>
      </div>
    );
  }

  componentWillMount(){

    axios.get(`http://localhost:3000/api/Atleta/${this.props.idatleta}/equipamento`,{headers: {'Authorization' : 'Bearer ' + this.props.token}})
    .then(response => {
      /*for(let i = 0; i < response.data.length; i++) {
        console.log("SOU->" + response.data[i].nome);
        this.setState({
          tem: this.state.tem.concat(response.data[i].nome)
        })
      }*/
      this.setState({
        tem: response.data
      });


      })
    .catch(error => console.log(error))
  }

  showEquipamentoAdquirido(data){
    return  data.map( (equip,elem) =>
      <div key={elem} className="col-6">
        <p className="mb-0"><small><Check />{equip.nome}</small></p>
      </div>
    );
}


  render() {
    console.log(this.props.idatleta);
    console.log(this.state.adicionar);
    console.log(this.state.tem);
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
          <Collapse isOpen={this.state.collapse} >
            <Card>
              <CardBody>
                <div className="row">
                  {this.showEquipamentoAdquirido(this.state.tem)}
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
