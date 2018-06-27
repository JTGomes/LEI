import React from 'react';
//import { Link, WrappedLink } from 'react-router-dom'
import './css/contactos.css'

class ContactosT extends React.Component {

  constructor(props){
    super(props);
    if(props.data){
      this.state = {
          email: props.data.email,
          telemovel: props.data.telemovel,
          morada: props.data.morada,
          postal: props.data.postal,
          localidade: props.data.localidade,
      }
    }else
        this.state = {
            email: '',
            telemovel: '',
            morada: '',
            postal: '',
            localidade: '',
        }
  }




   handleSubmit = (evt) => {
    const { name, redes } = this.state;
    alert(`Incorporated: ${name} with ${redes.length} redes`);
  };

  handleAddRedes = () => {
    this.setState({ redes: this.state.redes.concat([{ url: '' }]) });
  };

  handleRemoveRedes = (idx) => () => {
    this.setState({ redes: this.state.redes.filter((s, sidx) => idx !== sidx) });
  };

  onChange=(e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit = (e) => {
        const response = this.props.mutate({
            variables: this.state,
        });
        console.log(response);
    };

  render () {
    return (
      <div className="imagem">
      <div className="conteudo">
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
        <h3>Insira no seguinte formulário os contactos pedidos </h3><br/><br/>

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
          onChange={e => this.onChange(e)}
          value={this.state.telemovel}
          style={{minWidth: '200px'}}
        /><br/><br/>
        Morada<br/>
        <input
          name="morada"
          type="text"
          placeholder="Morada"
          onChange={e => this.onChange(e)}
          value={this.state.morada}
          style={{minWidth: '200px'}}
        /><br/><br/>
        Código Postal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Localidade<br/>
        <input
          name="postal"
          type="text"
          placeholder="Código Postal"
          pattern="[0-9]{4}-[0-9]{3}"
          onChange={e => this.onChange(e)}
          value={this.state.postal}
          style={{minWidth: '200px'}}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

      </div>
      </div>
    );
  }
}

export default ContactosT;
