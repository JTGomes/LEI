import React from 'react';
import FaEdit from 'react-icons/lib/fa/edit';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaClose from 'react-icons/lib/fa/close';
import ModalEditInfo from './component/modalPersonal';
import ModalEditDocs from './component/modalDocs';
import ModalPhoto from './component/modalPhoto';
import DropdownEquipment from './component/dropdownEquipment';
import './About.css';

class About extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalDataEdit: false,
      modalDocs: false,
      modalPhoto: false,
      dropdownOpen: false,
    }
    //DE=Data Edit
    this.toggleDE = this.toggleDE.bind(this);
    //D=Docs
    this.toggleD = this.toggleD.bind(this);
    //P=Photo
    this.toggleP = this.toggleP.bind(this);
    //DEq=Dropdown Equipment
    this.toggleDEq = this.toggleDEq.bind(this);
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

  toggleP(){
    this.setState({
      modalPhoto: !this.state.modalPhoto,
    })
  }

  toggleDEq() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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

  initModalPhoto(){
    this.setState({
      modalPhoto: true,
    })
  }

  //a ser modificado para incluir pagina do atleta nos links
  renderFaceb() {
    return(
      <div className="social">
        <p href="https://www.facebook.com" target="_blank"><FaFacebookOfficial /></p>
      </div>
    );
  }
  renderTwit() {
    return(
      <div className="social">
        <p href="https://www.twitter.com" target="_blank"><FaTwitterSquare /></p>
      </div>
    );
  }
  renderInsta() {
    return(
      <div className="social">
        <p href="https://www.instagram.com" target="_blank"><FaInstagram /></p>
      </div>
    );
  }
  //para fazer render dos botões das redes sociais
  renderSocial() {
    if(!this.props.socialN) {
      return(
        <p>Sem Redes Sociais associadas!</p>
      );
    }
    //verifica se objeto tem dada rede social como elemento
    if(this.props.socialN.hasOwnProperty('facebook')) this.renderFaceb();
    if(this.props.socialN.hasOwnProperty('twitter')) this.renderTwit();
    if(this.props.socialN.hasOwnProperty('instagram')) this.renderInsta();
  }

  render() {
    return(
      <div className="aboutathlete container-fluid">
        <p className="Title">Dados Pessoais <FaEdit onClick={()=>this.initModalDados()} style={{cursor:'pointer'}}/></p>
        <hr />
        <div className="section">
        <figure className="col0">
          <img id="profile-pic" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NTU2MzE2NTI5Nzg4NDI3/usain-bolt-20702091-1-402.jpg" alt="profileimage" />
          <figcaption id="profile-change" style={{cursor:'pointer'}} onClick={()=>this.initModalPhoto()}>Alterar Imagem <FaEdit /></figcaption>
        </figure>
        <div className="col">
          <p>Nome Completo: {this.props.name}</p>
          <p>Número de telemóvel: {this.props.phone}</p>
          <p>Nº de Documento: {this.props.documentId}</p>
          <p>Sócio: {this.props.isSocio}</p>
        </div>
        <div className="col">
          <p>Género: {this.props.gender}</p>
          <p>Endereço de e-mail: {this.props.email}</p>
          <p>Morada: {this.props.morada}</p>
          <p>Nº cartão de sócio: {this.props.socioNum}</p>
        </div>
        <div className="col">
          <p>NIF: {this.props.nif}</p>
          <p>Nacionalidade: {this.props.nacionalidade}</p>
          <p>Código Postal: {this.props.postal}</p>
          <p>Treinador(es): {this.props.treinadores}</p>
        </div>
        <div className="col">
          <p>Data de Nascimento: {this.props.birth}</p>
          <p>Tipo de Documento: {this.props.identificacao}</p>
          <p>Localidade: {this.props.localidade}</p>
          <p>Encarregado de Educação: <FaClose style={{color:'red'}} /></p>
        </div>
      </div>
      <div className="section">
        <p className="Title">Dados de Filiação</p>
        <hr />
        <div className="col">
          <p>Tipo de Filiação: {this.props.filiacao}</p>
          <p>Contrato até: {this.props.contracaate}</p>
          <p>Escalão: {this.props.escalao}</p>
          <p>Subsídio: {this.props.subs}</p>
        </div>
        <div className="col">
          <p>Inscrito desde:&nbsp;20/06/2018</p>
          <DropdownEquipment dropdownOpen={this.state.dropdownOpen} toggle={this.toggleDEq} />
        </div>
      </div>
      <div className="section">
        <p className="Title">Documentos <FaEdit onClick={()=>this.initModalDocs()} style={{cursor:'pointer'}}/></p>
        <hr />
        <div className="col">
          <p>Cartão de Cidadão {this.props.id}</p>
          <p>Exames Médicos {this.props.medical}</p>
          <p>Imprimir</p>
        </div>
      </div>
      <div className="section">
        <p className="Title">Redes Sociais</p>
        <hr />
        {this.renderSocial()}
      </div>
        <ModalEditInfo toggle={this.toggleDE} modalDataEdit={this.state.modalDataEdit} />
        <ModalEditDocs toggle={this.toggleD} modalDocs={this.state.modalDocs} />
        <ModalPhoto toggle={this.toggleP} modalPhoto={this.state.modalPhoto} />
      </div>
    );
  }
}

export default About;
