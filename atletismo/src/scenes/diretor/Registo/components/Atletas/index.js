import React, { Component } from 'react';
import Check from 'react-icons/lib/fa/check';
import Close from 'react-icons/lib/fa/close';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import {Button, Modal,ModalHeader, ModalBody, ModalFooter,Table,Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';

class Atleta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      accept: false,
      modalUserInfo: false,
      uid: undefined,
      user: undefined,
      isento: undefined,
      input: '',
    };

    this.toggle = this.toggle.bind(this);
    this.toggleM = this.toggleM.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleM(){
    this.setState({
      modalUserInfo: !this.state.modalUserInfo,
    })
  }

  initModal(userid, aceitar){
    this.setState({
      modal: true,
      accept : aceitar,
      uid: userid.user.id,
      isento: undefined,
      user: userid
    });
  }

  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }

  setIsencao(isIsento){
    this.setState({
      isento: isIsento,
    })
  }

  acceptUser(){
    axios.put('http://localhost:3000/api/Users/validar',
      {userId : this.state.uid,
        isIsento: this.state.isento}
      , {headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response =>{
            this.props.remover(this.state.uid);
            this.toggle();
          })
      .catch(error => console.log(error))
  }

  rejectUser(){
    axios.post('http://localhost:3000/api/Users/rejeitaRegisto',
    {userId: this.state.uid,role: this.state.user.user.role, id: this.state.user.id},
    {headers:{'Authorization' : 'Bearer ' + this.props.token}}
  ).then(response => {
        this.props.remover(this.state.uid);
        this.toggle();
      })
    .catch(error => console.log(error))
  }

  getRow(obj,elem){
    return (<tr key={elem}>
        <td style={{cursor:'pointer'}} onClick={()=>{this.initModalUser(obj)}}>{obj.user.nome}</td>
        <td>
          <Button color="success" onClick={()=>{this.initModal(obj,true)}}>
            <Check />
          </Button>{'  '}
          <Button color="danger" onClick={()=>{this.initModal(obj,false)}}>
            <Close />
          </Button>
        </td>
         </tr>);
  }

  filter_data_byName(data){
          if(this.state.input===''){
            return data;
          }
          const text = this.state.input.toUpperCase();
          return data.filter( data_row => data_row.nome.toUpperCase().indexOf(text) !== -1);
   }

   handleInputSubmit(event) {
     this.setState({
       input: event.target.value
     });
   }

  render() {
    return (
        <div>
          <div className="row">
            <Form className="col-lg-3">
              <FormGroup>
                <Input type="text" name="searchbar" id="searchbar" value={this.state.input} placeholder="Pesquisar Atleta" onChange={event => this.handleInputSubmit(event)}/>
              </FormGroup>
            </Form>
          </div>
        <Table responsive hover striped>
          <thead>
            <tr>
              <th>Nome do Atleta</th>
              <th>Aceitar/Rejeitar</th>
            </tr>
          </thead>
          <tbody>
            {this.filter_data_byName(this.props.data).map( (obj,elem) => this.getRow(obj,elem))}
          </tbody>

        </Table>

        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Aceitação de Registo</ModalHeader>
          <ModalBody>
          {this.state.accept?
            <Form>
              <FormGroup className="ml-2" tag="fieldset" row>
                <legend>O atleta está isento de mensalidade?</legend>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" name="radio2"  onChange={()=>this.setIsencao(true)}/>{' '}
                        Sim
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="radio" name="radio2" onChange={()=>this.setIsencao(false)} />{' '}
                          Não
                        </Label>
                      </FormGroup>
                  </FormGroup>
                </Form>
            : 'Tem a certeza que pretende rejeitar o Atleta?'
          }
          </ModalBody>
          <ModalFooter>
            {this.state.accept?
              <Button color="primary" disabled={this.state.isento===undefined} onClick={()=>this.acceptUser()}>Aceitar</Button>
             :<Button color="primary" onClick={()=>this.rejectUser()}>Rejeitar</Button> }
            {' '}
              <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
          {this.state.modalUserInfo && <ModalUserInfo toggle={this.toggleM} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />}
        </div>

    );
  }
}
function mapStateToProps(state){
  return {
    token: state.token
  };
}

export default connect(mapStateToProps)(Atleta);
