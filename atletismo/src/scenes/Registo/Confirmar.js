import React from 'react';
import { Link } from 'react-router-dom'
import './css/confirmar.css'

class Confirmar extends React.Component {

    splitAndGetLast(s){
        let l = s.split('[/\\]');
        return l[l.length-1];
    }

  render () {
    return (
      <div className="confirm-page">
        <p className="text-center confirm-header">Confirmação do Registo</p>
        <p className="text-center confirm-sec-header">Confirme todos os campos inseridos</p>
        <div className="row justify-content-center">
          <div className="confirm-data">
            <div id="registo" className="col-12">
              <h2><Link to='/InfoPess'>DADOS PESSOAIS</Link></h2>
              Nome: <label id="max">{ this.props.data[0].nome}</label><br/>
              Data de Nascimento: <label id="max">{ this.props.data[0].data}</label><br/>
              Nacionalidade: <label id="max">{ this.props.data[0].nacionalidade}</label><br/>
              Número do CC: <label id="max">{ this.props.data[0].nccidadao}</label><br/>
              Género: <label id="max">{ this.props.data[0].gender}</label><br/>
              Escalão: <label id="max">{ this.props.data[0].escalao}</label><br/>
            </div>
            <div id="contactos" className="col-12">
              <h2><Link to='/Contactos'>CONTACTOS</Link></h2>
              Email: <label id="max">{ this.props.data[1].email}</label><br/>
              Telemóvel: <label id="max">{ this.props.data[1].telemovel}</label><br/>
              Redes Sociais: <label id="max">{ this.props.data[1].redes.map( s => s.uri)}</label><br/>
              Morada: <label id="max">{ this.props.data[1].morada}</label><br/>
              Código Postal: <label id="max">{ this.props.data[1].postal}</label> Localidade: <label id="max">{ this.props.data[1].localidade}</label>
            </div>
            <div id="documentos" className="col-12">
              <h2><Link to='/Documentos'>DOCUMENTOS</Link></h2>
              Foto: <label id="max">{  this.props.data[2].foto }</label><br/><br/>
              Cartão do Cidadão: <label id="max">{  this.props.data[2].cc }</label><br/><br/>
              Atestado Médico: <label id="max">{  this.props.data[2].am }</label><br/><br/>
              Número de Sócio do SC Braga: <label id="max">{ this.props.data[2].nsocio}</label><br/><br/><br/><br/><br/>
            </div>
          </div>
          <div id="buttons" className="col-12">
            <button id="anterior"  onClick={(e) => this.props.onPrev(4,{})}>
              Anterior
            </button>
            <button id="seguinte"  onClick={(e) => this.props.onNext(4,{})}>
              Confirmar Registo
            </button>
          </div>
        </div>
        </div>
    );
  }
}

export default Confirmar;
