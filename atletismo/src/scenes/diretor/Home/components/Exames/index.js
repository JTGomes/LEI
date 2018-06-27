import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Table,Button,Alert,Form,FormGroup,Input } from 'reactstrap';
import Check from 'react-icons/lib/fa/check';
import PDF from 'react-icons/lib/fa/file-pdf-o';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import SendNotification from '../../../../../components/SendNotification';
import Send from 'react-icons/lib/fa/paper-plane';

class Exames extends Component {
  constructor(props){
    super(props);
    this.state = {
      info: [],
      modalUserInfo: false,
      modalNotification: false,
      uid: undefined,
      name: undefined,
      input: '',
      userId: undefined
    }
    this.toggle = this.toggle.bind(this);
    this.toggleS = this.toggleS.bind(this);
  }

  componentDidMount() {

    let config = {
      headers: {'Authorization' : 'Bearer ' + this.props.token},
    }

    axios.get(`http://localhost:3000/api/Atleta?filter[where][exameFalta]=false`, config)
        .then(response => {
          this.setState({
            info: response.data,
          })
        })
        .catch(error => console.log(error))
  }

  toggle(){
    this.setState({
      modalUserInfo: !this.state.modalUserInfo,
    })
  }

  toggleS(){
    this.setState({
      modalNotification: !this.state.modalNotification,
    })
  }

  initModalUser(userID){
    this.setState({
      modalUserInfo: true,
      uid: userID,
    })
  }


  initModalNotification(userID,name){
    this.setState({
        modalNotification: true,
        name: name,
        userId: userID
    })
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

  getRow(obj,elem){
    return (<tr key={elem}>
             <td onClick={()=>this.initModalUser(obj)} style={{cursor:'pointer'}}>{obj.nome_competicao}</td>
             <td >{obj.dataNascimento}</td>
             <td ><Button color="success"><Check />{' '}Validar</Button></td>
             <td><a target='_blank' href={obj.exameMedico}><Button color="secondary"><PDF />{' '}ver exame</Button></a></td>
            <td><Button color="primary" onClick={()=> this.initModalNotification(obj.userId,obj.nome_competicao)}><Send />{' '}Nova Notificação</Button></td>
         </tr>);
  }

  render() {
    return (
      <div>
        {this.state.info.length>0 ?
          <div>
            <div className="row">
              <Form className="col-lg-3">
                <FormGroup>
                  <Input type="text" name="searchbar" id="searchbar" value={this.state.input} placeholder="Pesquisar Atleta" onChange={event => this.handleInputSubmit(event)}/>
                </FormGroup>
              </Form>
            </div>
            <Table responsive hover striped >
              <thead >
                <tr >
                  <th>Nome do Atleta</th>
                  <th>Data de Nascimento</th>
                  <th>Validar Exame Médico</th>
                  <th>Exame Médico</th>
                  <th>Notificar</th>
                </tr>
              </thead>
              <tbody>
                {this.filter_data_byName(this.state.info).map( (obj,elem) => this.getRow(obj,elem))}
              </tbody>
            </Table>
          </div>:
          <Alert color="success">
            Não há exames médicos em falta
          </Alert>}
          <ModalUserInfo toggle={this.toggle} modalUserInfo={this.state.modalUserInfo} user={this.state.info} />
          {this.state.userId && <SendNotification toggle={this.toggleS} name={this.state.name} user={this.state.userId} isOpen={this.state.modalNotification}/>
          }
        </div>
    );
  }

}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(Exames);
