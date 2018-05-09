import React from 'react';
import { Link, WrappedLink } from 'react-router-dom'
import './css/contactos.css'

class ContactosT extends React.Component {

  state = {
    email: '',
    telemovel: '',
    redes: [{ url: '' }],
    morada: '',
    postal: '',
    localidade: '',
  }

  handleRedesChange = (idx) => (evt) => {
    const newRedes = this.state.redes.map((redes, sidx) => {
      if (idx !== sidx) return redes;
      return { ...redes, name: evt.target.value };
    });
    
    this.setState({ redes: newRedes });
  }

  handleSubmit = (evt) => {
    const { name, redes } = this.state;
    alert(`Incorporated: ${name} with ${redes.length} redes`);
  }
  
  handleAddRedes = () => {
    this.setState({ redes: this.state.redes.concat([{ url: '' }]) });
  }
  
  handleRemoveRedes = (idx) => () => {
    this.setState({ redes: this.state.redes.filter((s, sidx) => idx !== sidx) });
  }

  onChange = (e) => {
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
      <div>
      <div className="container">
        <ul className="progressbar">
          <li className="active">Informações Pessoais</li>
          <li><label className="texto">Contactos</label></li>
          <li>Documentos</li>
          <li>Confirmar Registo</li>
          <li>Registo FPA</li>
        </ul>
      </div>

      <div id="formulario">
        <h1>Contactos</h1>
        <h3>Insira no seguinte formulário os contactos pedidos<br/><br/>

      <form onSubmit={this.handleSubmit}>
        Email<br/>
        <input
          name="email"
          type="email"
          placeholder="Email" 
          onChange = {e => this.onChange(e)}
          value = {this.state.email}
        /><br/><br/>
        Telemóvel<br/>
        <input
          name="telemovel"
          type="text"
          placeholder="Telemóvel" 
          onChange = {e => this.onChange(e)}
          value = {this.state.telemovel}
        /><br/><br/>
        Redes Sociais&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" id="adiciona" onClick={this.handleAddRedes} classNameName="small">+</button>&nbsp;&nbsp;&nbsp;&nbsp;
        {this.state.redes.map((rede, idx) => (
          <div classNameName="rede">
            <input
              type="text"
              name="redes"
              placeholder={"Facebook/Instagram/Twitter"}
              value={rede.url}
              onChange={this.handleRedesChange(idx)}
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" id="remove" onClick={this.handleRemoveRedes(idx)} classNameName="small">-</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ))}<br/>
        Morada<br/>
        <input
          name="morada"
          type="text"
          placeholder="Morada" 
          onChange = {e => this.onChange(e)}
          value = {this.state.morada}
        /><br/><br/>
        Código Postal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Localidade<br/>
        <input
          name="postal"
          type="text"
          placeholder="Código Postal" 
          onChange = {e => this.onChange(e)}
          value = {this.state.postal}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          name="localidade"
          type="text"
          placeholder="Localidade" 
          onChange = {e => this.onChange(e)}
          value = {this.state.localidade}
        />
      </form><br/>

      <form>
      <Link to='/InfoPessT'>
        <button id="anterior">
          Anterior
        </button>
      </Link>
      <Link to='/DocumentosT'>
        <button id="seguinte">
          Seguinte
        </button>
      </Link>
      </form>
      </h3>
      </div>
      </div>
    );
  }
}

export default ContactosT;
