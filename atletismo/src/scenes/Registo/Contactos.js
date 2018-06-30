import React from 'react';
//import { Link, WrappedLink } from 'react-router-dom'
import './css/contactos.css';

class Contactos extends React.Component {


    constructor(props){
        super(props);
        if(props.data){
            this.state = {
                email: props.data.email,
                telemovel: props.data.telemovel,
                redes: props.data.redes,
                morada: props.data.morada,
                postal: props.data.postal,
                localidade: props.data.localidade,
                warn: false,
            }
        }else
            this.state = {
                email: '',
                telemovel: '',
                redes: [{ url: '' }],
                morada: '',
                postal: '',
                localidade: '',
                warn: false,
            }
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

  onChange=(e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }

  onChangePhone=(e) => {
    if(e.target.value.length<10 && !isNaN(e.target.value)) {
      this.setState({
        [e.target.name]: e.target.value,
        warn: false,
      });
    }
    else {
      this.setState({
        warn: true,
      });
    }
  }

  onSubmit = (e) => {
      const response = this.props.mutate({
          variables: this.state,
      });
      console.log(response);
  }

  renderSizeWarning() {
    if(this.state.warn) {
      return(
        <p>ATENÇÃO: O número de telefone tem de ser de 9 dígitos!</p>
      );
    }
    else return;
  }

  render () {
    return (
      <div className="imagem">

      <div id="formulario">
        <h1>Contactos</h1>
        <h3>Insira no seguinte formulário os contactos pedidos<br/><br/>

      <form onSubmit={this.handleSubmit}>
        Email<br/>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={e => this.onChange(e)}
          value={this.state.email}
          style={{minWidth: '200px'}}
        /><br/><br/>
        Telemóvel<br/>
        <input
          name="telemovel"
          type="text"
          placeholder="Telemóvel"
          onChange={e => this.onChangePhone(e)}
          value={this.state.telemovel}
          style={{minWidth: '200px'}}
        /><br/><br/>
        {this.renderSizeWarning()}
        Redes Sociais
        <button type="button" id="adiciona" onClick={this.handleAddRedes} style={{ color:'white'}} className="small"><strong>+</strong></button>&nbsp;&nbsp;&nbsp;&nbsp;
        {this.state.redes.map((rede, idx) => (
          <div className="rede" key={idx}>
            <input
              type="text"
              name="redes"
              placeholder={"Facebook/Instagram/Twitter"}
              value={rede.url}
              onChange={this.handleRedesChange(idx)}
              style={{minWidth: '200px'}}
            />
            <button type="button" id="remove" onClick={this.handleRemoveRedes(idx)} className="small"><strong style={{ color:'white'}}>-</strong></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ))}<br/>
        Morada<br/>
        <input
          name="morada"
          type="text"
          placeholder="Morada"
          onChange={e => this.onChange(e)}
          value={this.state.morada}
          style={{minWidth: '200px'}}
        /><br/>
        Código Postal<br/>
        <input
          name="postal"
          type="text"
          placeholder="Código Postal"
          onChange={e => this.onChange(e)}
          value={this.state.postal}
          style={{minWidth: '200px'}}
        /><br/>
        Localidade<br/>
        <input
          name="localidade"
          type="text"
          placeholder="Localidade"
          onChange={e => this.onChange(e)}
          value={this.state.localidade}
          style={{minWidth: '200px'}}
        />
      </form><br/>

      <form>
        <button id="anterior" onClick={(e) => this.props.onPrev(2,this.state)}>
          Anterior
        </button>
        <button id="seguinte" onClick={(e) => this.props.onNext(2,this.state)}>
          Seguinte
        </button>
      </form>
      </h3>
      </div>
      </div>
    );
  }
}

export default Contactos;
