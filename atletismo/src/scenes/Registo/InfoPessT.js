import React from 'react';
import './css/infopess.css'

class InfoPessT extends React.Component {
  constructor(props){
    super(props);
    if(props.data){
      this.state = {
          nome: props.data.nome,
          password: props.data.password,
          dia: props.data.dia,
          mes: props.data.mes,
          ano: props.data.ano,
          nacionalidade: props.data.nacionalidade,
          cc: props.data.cc,
          con: props.data.con,
          gender: props.data.gender,
      }
    }else this.state = {
        nome: '',
        password: '',
        dia: '',
        mes: '',
        ano: '',
        nacionalidade: '',
        cc: '',
        con: '',
        gender: '',
    }
  }

  onChange=(e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  }


    onSubmit(e){
        this.props.onNext(1,this.state);
        console.log("Passo 1");
    }

  render () {
    return (
      <div>

        <div className="container">
          <ul className="progressbar">
            <li><label className="texto">Informações Pessoais</label></li>
            <li>Contactos</li>
            <li>Documentos</li>
            <li>Confirmar Registo</li>
            <li>Registo FPA</li>
          </ul>
        </div>

        <div id="formulario">
          <h1>REGISTO DE TREINADORES</h1>
          <h3>Faça aqui o seu registo e torne-se treinador no SC Braga
          <form id="forms">
            <p>
            Nome<br/>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              onChange={(e) => this.onChange(e)}
              value={this.state.nome}
            />
            </p>
            <p>
            Password<br/>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={e => this.onChange(e)}
              value={this.state.password}
            />
            </p>
            <p>
            Data de Nascimento<br/>
            <input
              name="dia"
              type="text"
              placeholder="DD"
              onChange={e => this.onChange(e)}
              value={this.state.dia}
            />&nbsp;
            <input
              name="mes"
              type="text"
              placeholder="MM"
              onChange={e => this.onChange(e)}
              value={this.state.mes}
            />&nbsp;
            <input
              name="ano"
              type="text"
              placeholder="AAAA"
              onChange={e => this.onChange(e)}
              value={this.state.ano}
            />
            </p>
            <p>
            Nacionalidade<br/>
            <input
              name="nac"
              type="text"
              placeholder="Nacionalidade"
              onChange={e => this.onChange(e)}
              value={this.state.nac}
            />
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Número CC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Número de Contribuinte<br/>
            <input
              name="cc"
              type="text"
              placeholder="Número do CC"
              onChange={e => this.onChange(e)}
              value={this.state.cc}
            />&nbsp;
            <input
              name="con"
              type="text"
              placeholder="Número de Contribuinte"
              onChange={e => this.onChange(e)}
              value={this.state.con}
            />
            <br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Género&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
            <input
              name="genero"
              type="radio"
              onChange={e => this.onChange(e)}
              value={this.state.gender}
            /> Feminino
            <input
              name="genero"
              type="radio"
              onChange={e => this.onChange(e)}
              value={this.state.gender}
            /> Masculino&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </form>
          <form>
            <button id="seguinte" onClick={(e) =>this.onSubmit(e)}>
              Seguinte
            </button>
          </form>
          </h3>
        </div>
      </div>
    );
  }
}

export default InfoPessT;
