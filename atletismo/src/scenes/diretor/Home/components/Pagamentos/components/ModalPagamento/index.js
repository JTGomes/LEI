import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap';



class ModalPagamento extends Component {

  constructor(props){
    super(props);
    this.state={
      mesesSelect: undefined,
    }
  }

  pagamento(){
    console.log('pagamento '+this.state.mesesSelect+' meses');
    this.props.toggle();
  }

  render() {
    let options=[];
    for (let i = 1; i <= this.props.meses; i++) {
      options.push(<option key={i}>{i}</option>);
    }
    return(
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
          <ModalHeader toggle={this.props.toggle}>Pagamento</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="Select">Selecione o número de meses pagos</Label>
                <Input type="select" name="select" id="Select" onChange={event => this.setState({mesesSelect: event.target.value})}>
                  {options}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.pagamento()}>Efetuar Pagamento</Button>{' '}
            <Button color="secondary" onClick={this.props.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
    );
  }
}

export default ModalPagamento;
