import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import FaEdit from 'react-icons/lib/fa/edit';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaInstagram from 'react-icons/lib/fa/instagram';
import FaClose from 'react-icons/lib/fa/close';
import {Button} from 'reactstrap';
import ModalEditInfo from './component/modalPersonal';
import ModalEditDocs from './component/modalDocs';
import ModalPhoto from './component/modalPhoto';
import DropdownEquipment from './component/dropdownEquipment';
import './About.css';

class About extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      info: [],
      infoUser: [],
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

  componentDidMount(){

    let url = this.props.userId;


    if(this.props.param) {
      url = this.props.param;
    }

    axios.get(`http://localhost:3000/api/Atleta/${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
        .then(response => {
          this.setState({
            info: response.data,
          })
        })
        .catch(error => console.log(error))

    axios.get(`http://localhost:3000/api/User/${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
    .then(response => {
      this.setState({
        infoUser: response.data,
      })
    })
    .catch(error => console.log(error))
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
    if(!this.state.info.socialN) {
      return(
        <p>Sem Redes Sociais associadas!</p>
      );
    }
    //verifica se objeto tem dada rede social como elemento
    if(this.state.info.socialN.hasOwnProperty('facebook')) this.renderFaceb();
    if(this.state.info.socialN.hasOwnProperty('twitter')) this.renderTwit();
    if(this.state.info.socialN.hasOwnProperty('instagram')) this.renderInsta();
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
            <p><a class="info">Nome Completo:</a> {this.state.info.nome_competicao}</p>
            <p><a class="info">Número de telemóvel:</a> {this.state.info.telemovel}</p>
            <p><a class="info">Nº de Documento:</a> {this.state.info.nrdocumento}</p>
            <p><a class="info">Sócio:</a> {1000}</p>
          </div>
          <div className="col">
            <p><a class="info">Género:</a> {this.state.info.genero}</p>
            <p><a class="info">Endereço de e-mail:</a> {this.state.infoUser.email}</p>
            <p><a class="info">Morada:</a> {this.state.info.morada}</p>
            <p><a class="info">Nº cartão de sócio:</a> {this.state.info.nrSocio}</p>
          </div>
          <div className="col">
            <p><a class="info">NIF:</a> {this.state.info.nif}</p>
            <p><a class="info">Nacionalidade:</a> {this.state.info.nacionalidade}</p>
            <p><a class="info">Código Postal:</a> {this.state.info.codigoPostal}</p>
            <p><a class="info">Treinador(es):</a> {this.state.info.treinadorId}</p>
          </div>
          <div className="col">
            <p><a class="info">Data de Nascimento:</a> {this.state.info.dataNascimento}</p>
            <p><a class="info">Tipo de Documento:</a> {this.state.info.tipoDocumento}</p>
            <p><a class="info">Localidade:</a> {this.state.info.morada}</p>
          </div>
        </div>
        <div className="section">
          <p className="Title">Dados de Filiação</p>
          <hr />
          <div className="col">
            <p><a class="info">Tipo de Filiação:</a> {this.state.info.encarregado}</p>
            <p><a class="info">Contrato até:</a> {this.state.info.encarregado}</p>
            <p><a class="info">Escalão:</a> {this.state.info.escalao}</p>
            <p><a class="info">Subsídio:</a> {this.state.info.subsidio}</p>
          </div>
          <div className="col">
            <DropdownEquipment dropdownOpen={this.state.dropdownOpen} toggle={this.toggleDEq} />
          </div>
        </div>
        <div className="section">
          <p className="Title">Documentos <FaEdit onClick={()=>this.initModalDocs()} style={{cursor:'pointer'}}/></p>
          <hr />
          <div className="col">
            <p><a class="info">Cartão de Cidadão:</a> {this.state.info.cartaoCidadao}</p>
            <p><a class="info">Exames Médicos:</a> {this.state.info.exameMedico}</p>
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

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token
  };
}


export default connect(mapStateToProps)(About);