import React from 'react';
//import { Link, WrappedLink } from 'react-router-dom'
import './css/documentos.css'

class DocumentosT extends React.Component {

    constructor(props){
        super(props);
        if(props.data){
            this.state = {
                foto: props.data.foto,
                cc: props.data.cc,
                am: props.data.am,
                socio: props.data.socio,
                nsocio: props.data.nsocio,
                ntreinador: props.data.ntreinador,
            }
        }else this.state = {
            foto: '',
            cc: '',
            am: '',
            socio: '',
            nsocio: '',
            ntreinador: '',
        }
    }


  onChange=(e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = (e) => {
        const response = this.props.mutate({
            variables: this.state,
        });
        console.log(response);
    }

  render () {
    return (
      <div className="imagem">
        <div className="conteudo">
          <ul className="progressbar">
            <li className="active">Informações Pessoais</li>
            <li className="active">Contactos</li>
            <li><label className="texto">Documentos</label></li>
            <li>Confirmar Registo</li>
            <li>Registo FPA</li>
          </ul>
        </div>

    <div id="formulario">
      <h1>Documentos</h1>
      <h3>Forneça os documentos pedidos</h3><br/><br/>
    <form>
      Foto<br/>
      <label id="label">
        <input
          name="foto"
          type="file"
          onChange={e => this.onChange(e)}
          value={this.state.foto}
        /><br/>
      </label><br/>
      Cartão do Cidadão<br/>
      <label id="label">
        <input
          name="cc"
          type="file"
          onChange={e => this.onChange(e)}
          value={this.state.cc}
        /><br/>
      </label><br/>
      Atestado Médico<br/>
      <label id="label">
        <input
          name="am"
          type="file"
          onChange={e => this.onChange(e)}
          value={this.state.am}
        /><br/>
      </label><br/>
      Sócio do SC Braga<br/>
        <input
          name="opcao"
          type="radio"
          onChange={e => this.onChange(e)}
          value={this.state.socio}
        />Sim&nbsp;
        <input
          name="opcao"
          type="radio"
          onChange={e => this.onChange(e)}
          value={this.state.socio}
        />Não<br/>
      Número de Sócio<br/>
        <input
          name="numero"
          type="text"
          placeholder="Número"
          onChange={e => this.onChange(e)}
          value={this.state.nsocio}
          style={{minWidth: '200px'}}
        /><br/><br/>
      Número de Treinador (FPA)<br/>
        <input
          name="numero"
          type="text"
          placeholder="Número"
          onChange={e => this.onChange(e)}
          value={this.state.nsocio}
          style={{minWidth: '200px'}}
        /><br/><br/>
    </form>

    <form>
      <button id="anterior" formAction="file:contactos.html" onClick={(e) => this.props.onPrev(3,this.state)}>
        Anterior
      </button>
      <button id="seguinte" formAction="file:conclusao.html" onClick={(e) => this.props.onNext(3,this.state)}>
        Registar
      </button>
    </form>
    </div>
    </div>
    );
  }
}

export default DocumentosT;
