import React from 'react';
import { Link } from 'react-router-dom'
import './css/confirmar.css'

class ConfirmarT extends React.Component {
  render () {
    return (
      <div className="confirm-page">
        <p className="text-center confirm-header">Confirmação do Registo</p>
        <p className="text-center confirm-sec-header">Confirme todos os campos inseridos</p>
        <div className="row justify-content-center">
          <div className="confirm-data">
            <div id="registo" className="col-12">
              <h2><Link to='/InfoPess'>DADOS PESSOAIS</Link></h2>
              Nome: <label id="max">Exemplo</label><br/>
              Data de Nascimento: <label id="max">01-01-2018</label><br/>
              Nacionalidade: <label id="max">Portuguesa</label><br/>
              Número do CC: <label id="max">11111111</label><br/>
              Género: <label id="max">Feminino</label><br/>
            </div>
            <div id="contactos"  className="col-12">
              <h2><Link to='/Contactos'>CONTACTOS</Link></h2>
              Email: <label id="max">exemplo@gmail.com</label><br/>
              Telemóvel: <label id="max">919 999 999</label><br/>
              Redes Sociais: <label id="max">facebook.com/exemplo</label><br/>
              Morada: <label id="max">Rua Exemplo, 999</label><br/>
              Código Postal: <label id="max">9999-999</label> Localidade: <label id="max">Exemplo</label>
            </div>
            <div id="documentos"  className="col-12">
              <h2><Link to='/Documentos'>DOCUMENTOS</Link></h2>
              Foto: <label id="max">FOTO.jpeg</label><br/>
              Cartão do Cidadão: <label id="max">CC.pdf</label><br/>
              Atestado Médico: <label id="max">AM.pdf</label><br/>
              Número de Sócio do SC Braga: <label id="max">999999999</label><br/>
              Número de Treinador da FPA: <label id="max">999999999</label><br/>
            </div>
          </div>
          <div id="buttons" className="col-12">
            <button id="anterior" onClick={(e) => this.props.onPrev(4,{})}>
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

export default ConfirmarT;
