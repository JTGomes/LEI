import React from 'react';
import FaEdit from 'react-icons/lib/fa/edit';
import './About.css';

class About extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalUserInfo: false,
      modalNotification: false,
      uid: undefined,
      name: undefined,
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

  render() {
    return(
      <div className="aboutathlete">
        <a className="Title">Dados Pessoais <FaEdit /></a>
        <hr />
        <div className="gridcontent">
          <a>Nome Completo: {this.props.name}</a>
          <a>Género: {this.props.gender}</a>
          <a>NIF: {this.props.nif}</a>
          <a>Data de Nascimento: {this.props.birth}</a>
          <a>Morada: {this.props.address}</a>
          <a>Número de telemóvel: {this.props.phone}</a>
          <a>Endereço de e-mail: {this.props.email}</a>
          <a>Nacionalidade: {this.props.nacionalidade}</a>
          <a>Tipo de Documento: {this.props.identificacao}</a>
          <a>Nº de Documento: {this.props.documentId}</a>
          <a>Morada: {this.props.morada}</a>
          <a>Código Postal: {this.props.postal}</a>
          <a>Localidade: {this.props.localidade}</a>
          <a>Sócio: {this.props.isSocio}</a>
          <a>Nº cartão de sócio: {this.props.socioNum}</a>
          <a>Treinador(es): {this.props.treinadores}</a>
        </div>
        <a className="Title"><pre/>Dados de Filiação <FaEdit /></a>
        <hr />
        <div className="gridcontent">
          <a>Tipo de Filiação: {this.props.filiacao}</a>
          <a>Contrato até: {this.props.contracaate}</a>
          <a>Escalão: {this.props.escalao}</a>
          <a>Subsídio: {this.props.subs}</a>
          <a>Equipamento disponível: {this.props.equip}</a>
        </div>
        <a className="Title"><pre/>Documentos <FaEdit /></a>
        <hr />
        <div className="gridcontent">
          <a>Cartão de Cidadão {this.props.id}</a>
          <a>Exames Médicos {this.props.medical}</a>
          <a>Imprimir</a>
        </div>
      </div>
    );
  }
}

export default About;
