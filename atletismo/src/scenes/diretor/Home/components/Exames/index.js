import React, { Component } from 'react';
import { Table,Button,Alert,Form,FormGroup,Input } from 'reactstrap';
import Check from 'react-icons/lib/fa/check';
import PDF from 'react-icons/lib/fa/file-pdf-o';
import ModalUserInfo from '../../../../../components/ModalUserInfo';
import SendNotification from '../../../../../components/SendNotification';
import Send from 'react-icons/lib/fa/paper-plane';

const data=[
  {nome:'João Luís Costa',uid:'uid',nascimento: '02/02/1994',exame: 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'},
  {nome:'Alfredo Lopes da Silva',uid:'uid',nascimento: '05/02/1990',exame: 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'}]



class Exames extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalUserInfo: false,
      modalNotification: false,
      uid: undefined,
      name: undefined,
      input: '',
    }
    this.toggle = this.toggle.bind(this);
    this.toggleS = this.toggleS.bind(this);
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
        uid: userID,
        name: name,
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
             <td onClick={()=>this.initModalUser(obj.uid)} style={{cursor:'pointer'}}>{obj.nome}</td>
             <td >{obj.nascimento}</td>
             <td ><Button color="success">< Check />{' '}Validar</Button></td>
             <td><a target='_blank' href={obj.exame}><Button color="secondary"><PDF />{' '}ver exame</Button></a></td>
            <td><Button color="primary" onClick={()=> this.initModalNotification(obj.uid,obj.nome)}><Send />{' '}Nova Notificação</Button></td>
         </tr>);
  }




  render() {
    return (
      <div>
        {data.length>0 ?
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
                {this.filter_data_byName(data).map( (obj,elem) => this.getRow(obj,elem))}
              </tbody>
            </Table>
          </div>:
          <Alert color="success">
            Não há exames médicos em falta
          </Alert>}

          <ModalUserInfo toggle={this.toggle} modalUserInfo={this.state.modalUserInfo} user={this.state.uid} />
          <SendNotification toggle={this.toggleS} user={this.state.uid} name={this.state.name} isOpen={this.state.modalNotification}/>
        </div>
    );
  }

}

export default Exames;
