import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ModalEditInfo from './component/modalPersonal';
import ModalEditDocs from './component/modalDocs';
import FaEdit from 'react-icons/lib/fa/edit';
import "./css/Tpersonaldata.css";

class TPersonalDataFrame extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      info: [],
      infoUser: [],
      contrato: {
        end: "01/09/2018",
        salario:"30500€"
      },
      doc: {
        cc:"/",
        em:"/"
      },
      modalDataEdit: false,
      modalDocs: false,
    };
    this.toggleDE = this.toggleDE.bind(this);
    this.toggleD = this.toggleD.bind(this);
  }

  toggleDE(){
    this.setState({
      modalDataEdit: !this.state.modalDataEdit,
    })
  }

  toggleD(){
    this.setState({
      modalDocs: !this.state.modalDocs,
    })
  }

  initModalDados(){
    this.setState({
      modalDataEdit: true,
    })
  }

  initModalDocs(){
    this.setState({
      modalDocs: true,
    })
  }

  getTreinadorId () {

    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Treinadors?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
        return response.data[0].id;
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }
    this.getTreinadorId().then(data => {
      axios.get(`http://localhost:3000/api/Treinadors/${data}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
          .then(response => {
            this.setState({
              info: response.data,
            })
          })
          .catch(error => console.log(error))
      });

      axios.get(`http://localhost:3000/api/Users/${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
    .then(response => {
      this.setState({
        infoUser: response.data,
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="aboutathlete container-fluid">
        <p className="Title">Dados Pessoais <FaEdit onClick={()=>this.initModalDados()} style={{cursor:'pointer'}}/></p>
        <hr />
        <div className="section">
          <div className="col">
            <p><a class="info">Nome Completo:</a> {this.state.infoUser.nome}</p>
            <p><a class="info">Género: </a>{this.state.info.genero}</p>
            <p><a class="info">NIF:</a> {this.state.info.nif} </p>
            <p><a class="info">Nacionalidade: </a>{this.state.info.nacionalidade}</p>
          </div>
          <div className="col">
            <p><a class="info">Morada: </a>{this.state.info.morada} </p>
            <p><a class="info">Código Postal:</a> {this.state.info.codPostal}</p>
            <p><a class="info">Localidade: </a>{this.state.info.localidade} </p>
            <p><a class="info">Sócio:</a> {this.state.info.socio}</p>
          </div>
          <div className="col">
            <p><a class="info">Nível de Formação IPDJ:</a> {this.state.info.ipdj}</p>
          </div>
        </div>
        <div className="section">
          <p className="Title">Dados de Filiação</p>
          <hr />
          <div className="col">
            <p><a class="info">Contrato até: </a>{this.state.info.dataContrato}</p>
          </div>
        </div>
        <div className="section">
          <p className="Title">Documentos <FaEdit onClick={()=>this.initModalDocs()} style={{cursor:'pointer'}}/></p>
          <hr />
          <div className="col">
            <p><a class="info">Cartão de Cidadão: </a>{this.state.info.cartaoCidadao}</p>
            <p><a class="info">Exame Médico: </a>{this.state.info.exameMedico}</p>
          </div>
        </div>
        <ModalEditInfo toggle={this.toggleDE} modalDataEdit={this.state.modalDataEdit} treinadorID={this.props.userId}/>
        <ModalEditDocs toggle={this.toggleD} modalDocs={this.state.modalDocs} />
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


export default connect(mapStateToProps)(TPersonalDataFrame);