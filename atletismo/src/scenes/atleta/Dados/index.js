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
      atletaIDuser: undefined,
      info: [],
      infoUser: [],
      face: undefined,
      twitter: undefined,
      insta: undefined,
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

  getAtletaId(){
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }

    return axios.get(`http://localhost:3000/api/Atleta?filter[where][userId]=${url}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
      .then(response => {
          return response.data[0].id;
      })
      .catch(error => console.log(error))
  }

  componentDidMount(){
    let url = this.props.userId;
    if(this.props.param) {
      url = this.props.param;
    }
    this.getAtletaId().then(data => {
    axios.get(`http://localhost:3000/api/Atleta/${data}`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
        .then(response => {
          this.setState({
            atletaIDuser: data,
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

    this.getAtletaId().then(data => {
    axios.get(`http://localhost:3000/api/Atleta/${data}/redes`,{headers:{'Authorization' : 'Bearer ' + this.props.token}})
    .then(response => {
      console.log(response.data.length);
      response.data.map(link => {
        if(/.*facebook/.test(link.link))
          this.renderFaceb(link.link);
        if(/.*twitter/.test(link.link)) 
          this.renderTwit(link.link);
        if(/.*instagram/.test(link.link)) 
          this.renderInsta(link.link);
      });
    })
    .catch(error => console.log(error))
    });

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

  initModalDados(id){
    this.setState({
      modalDataEdit: true,
      atletaIDuser: id
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
  renderFaceb(url) {
    this.setState({
      face: <a href={url} target="_blank"><FaFacebookOfficial /></a>,
    });
  }

  renderTwit(url) {
    this.setState({
      twitter: <a href={url} target="_blank"><FaTwitterSquare /></a>,
    });
  }

  renderInsta(url) {
    this.setState({
      insta: <a href={url} target="_blank"><FaInstagram /></a>,
    });
  }
  //se for dirigente nao renderiza botao do equipamento
  renderEquip() {
    if(this.props.userRole==='Diretor')
      return;
    else
      return(
        <div className="col">
          <DropdownEquipment dropdownOpen={this.state.dropdownOpen} toggle={this.toggleDEq} />
        </div>
      );
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
            <p><a className="info">Nome Completo:</a> {this.state.infoUser.nome}</p>
            <p><a className="info">Número de telemóvel:</a> {this.state.info.telemovel}</p>
            <p><a className="info">Nº de Documento:</a> {this.state.info.nrdocumento}</p>
            <p><a className="info">Sócio:</a> {1000}</p>
          </div>
          <div className="col">
            <p><a className="info">Género:</a> {this.state.info.genero}</p>
            <p><a className="info">Endereço de E-mail:</a> {this.state.infoUser.email}</p>
            <p><a className="info">Morada:</a> {this.state.info.morada}</p>
            <p><a className="info">Nº cartão de sócio:</a> {this.state.info.nrSocio}</p>
          </div>
          <div className="col">
            <p><a className="info">NIF:</a> {this.state.info.nif}</p>
            <p><a className="info">Nacionalidade:</a> {this.state.info.nacionalidade}</p>
            <p><a className="info">Código Postal:</a> {this.state.info.codigoPostal}</p>
            <p><a className="info">Treinador(es):</a> {this.state.info.treinadorId}</p>
          </div>
          <div className="col">
            <p><a className="info">Data de Nascimento:</a> {this.state.info.dataNascimento}</p>
            <p><a className="info">Tipo de Documento:</a> {this.state.info.tipoDocumento}</p>
            <p><a className="info">Localidade:</a> {this.state.info.localidade}</p>
          </div>
        </div>
        <div className="section">
          <p className="Title">Dados de Filiação</p>
          <hr />
          <div className="col">
            <p><a className="info">Tipo de Filiação:</a> {this.state.info.encarregado}</p>
            <p><a className="info">Contrato até:</a></p>
            <p><a className="info">Escalão:</a> {this.state.info.escalao}</p>
            <p><a className="info">Subsídio:</a> {this.state.info.subsidio}</p>
          </div>
          {this.renderEquip()}
        </div>
        <div className="section">
          <p className="Title">Documentos <FaEdit onClick={()=>this.initModalDocs(this.state.info.id)} style={{cursor:'pointer'}}/></p>
          <hr />
          <div className="col">
            <p><a className="info">Cartão de Cidadão:</a> {this.state.info.cartaoCidadao}</p>
            <p><a className="info">Exames Médicos:</a> {this.state.info.exameMedico}</p>
            <p>Imprimir</p>
          </div>
        </div>
        <div className="section">
          <p className="Title">Redes Sociais</p>
          <hr />
          <div className="social">
            {this.state.face}
            {this.state.twitter}
            {this.state.insta}
          </div>
        </div>
        <ModalEditInfo toggle={this.toggleDE} modalDataEdit={this.state.modalDataEdit} user={this.props.userId} />
        <ModalEditDocs toggle={this.toggleD} modalDocs={this.state.modalDocs} />
        <ModalPhoto toggle={this.toggleP} modalPhoto={this.state.modalPhoto} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    userId: state.user,
    token: state.token,
    userRole: state.userRole
  };
}


export default connect(mapStateToProps)(About);