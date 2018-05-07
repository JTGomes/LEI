import React from 'react';
import FaEdit from 'react-icons/lib/fa/edit';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaInstagram from 'react-icons/lib/fa/instagram';
import ModalEditInfo from './component/modalPersonal';
import ModalEditDocs from './component/modalDocs';
import './About.css';

class About extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalDataEdit: false,
      modalDocs: false,
    }
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


  render() {
    return(
      <div className="aboutathlete">
        <a className="Title">Dados Pessoais <FaEdit onClick={()=>this.initModalDados()} style={{cursor:'pointer'}}/></a>
        <hr />
        <div className="gridcontent">
          <a>Nome Completo: {this.props.name}</a>
          <a>Género: {this.props.gender}</a>
          <a>NIF: {this.props.nif}</a>
          <a>Data de Nascimento: {this.props.birth}</a>
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
        <a className="Title"><pre/>Dados de Filiação</a>
        <hr />
        <div className="gridcontent">
          <a>Tipo de Filiação: {this.props.filiacao}</a>
          <a>Contrato até: {this.props.contracaate}</a>
          <a>Escalão: {this.props.escalao}</a>
          <a>Subsídio: {this.props.subs}</a>
          <a>Equipamento disponível: {this.props.equip}</a>
        </div>
        <a className="Title"><pre/>Documentos <FaEdit onClick={()=>this.initModalDocs()} style={{cursor:'pointer'}}/></a>
        <hr />
        <div className="gridcontent">
          <a>Cartão de Cidadão {this.props.id}</a>
          <a>Exames Médicos {this.props.medical}</a>
          <a>Imprimir</a>
        </div>
        <a className="Title"><pre/>Redes Sociais</a>
        <hr />
        <div className="social">
          <FaFacebookOfficial />
          <FaTwitterSquare />
          <FaInstagram />
        </div>
        <ModalEditInfo toggle={this.toggleDE} modalDataEdit={this.state.modalDataEdit} />
        <ModalEditDocs toggle={this.toggleD} modalDocs={this.state.modalDocs} />
      </div>
    );
  }
}

export default About;
