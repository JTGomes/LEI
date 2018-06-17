import React from 'react';
import { Link } from 'react-router-dom'
import './css/confirmar.css'

class ConfirmarT extends React.Component {
  render () {
    return (
      <div className="imagem">
      <div className="conteudo">
        <ul className="progressbar">
          <li className="active">Informações Pessoais</li>
          <li className="active">Contactos</li>
          <li className="active">Documentos</li>
          <li><label className="texto">Confirmar Registo</label></li>
          <li>Registo FPA</li>
        </ul>
      </div>

      <h1 className="text-center">Confirmação do Registo</h1>
      <h3 className="text-center">Confirme todos os campos inseridos</h3>
<div className="row justify-content-center">


      <div id="registo" className="col-12">
        <h2><Link to='/InfoPess'>DADOS PESSOAIS</Link></h2>
        Nome: <label id="max">Exemplo</label><br/><br/>
        Data de Nascimento: <label id="max">01-01-2018</label><br/><br/>
        Nacionalidade: <label id="max">Portuguesa</label><br/><br/>
        Número do CC: <label id="max">11111111</label><br/><br/>
        Género: <label id="max">Feminino</label><br/><br/>
      </div>



      <div id="contactos"  className="col-12">
        <h2><Link to='/Contactos'>CONTACTOS</Link></h2>
        Email: <label id="max">exemplo@gmail.com</label><br/><br/>
        Telemóvel: <label id="max">919 999 999</label><br/><br/>
        Redes Sociais: <label id="max">facebook.com/exemplo</label><br/><br/>
        Morada: <label id="max">Rua Exemplo, 999</label><br/><br/>
        Código Postal: <label id="max">9999-999</label> Localidade: <label id="max">Exemplo</label>
      </div>


      <div id="documentos"  className="col-12">
        <h2><Link to='/Documentos'>DOCUMENTOS</Link></h2>
        Foto: <label id="max">FOTO.jpeg</label><br/><br/>
        Cartão do Cidadão: <label id="max">CC.pdf</label><br/><br/>
        Atestado Médico: <label id="max">AM.pdf</label><br/><br/>
        Número de Sócio do SC Braga: <label id="max">999999999</label><br/><br/>
        Número de Treinador da FPA: <label id="max">999999999</label><br/><br/><br/>
      </div>

      <div id="buttons" className="col-12">
      <form>
        <button id="anterior" formAction="file:documentos.html" onClick={(e) => this.props.onPrev(4,{})}>
          Anterior
        </button>
        <button id="seguinte" formAction="file:lince.html" onClick={(e) => this.props.onNext(4,{})}>
          Confirmar Registo
        </button>
      </form>
      </div>
      </div>
      </div>

    );
  }
}

export default ConfirmarT;
