import React from 'react';
import './css/infopess.css'
import {Input} from 'reactstrap';

class InfoPessT extends React.Component {
  constructor(props){
    super(props);
    if(props.data){
      this.state = {
          nome: props.data.nome,
          password: props.data.password,
          data: props.data.data,
          nacionalidade: props.data.nacionalidade,
          cc: props.data.cc,
          con: props.data.con,
          gender: props.data.gender,
      }
    }else this.state = {
        nome: '',
        password: '',
        data: '',
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
      <div className="imagem">

        <div className="container-fluid conteudo">
          <ul className="progressbar">
            <li><label className="texto">Informações Pessoais</label></li>
            <li>Contactos</li>
            <li>Documentos</li>
            <li>Confirmar Registo</li>
            <li>Registo FPA</li>
          </ul>
        </div>

        <div id="formulario" >
          <h1>REGISTO DE TREINADORES</h1>
          <h3>Faça aqui o seu registo e torne-se treinador no SC Braga</h3>
          <form id="forms">
            <p>
            Nome<br/>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              onChange={(e) => this.onChange(e)}
              value={this.state.nome}
              style={{minWidth: '200px'}}
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
              style={{minWidth: '200px'}}
            />
            </p>

            <div className="row justify-content-center mb-3">

              <div className="col-12">
                Data de Nascimento
              </div>

              <div className="row">
                <Input type="date" name="data" id="exampleDate"
                  placeholder="data de nascimento"
                  className="col-2 campo"
                  style={{minWidth: '200px'}}
                  onChange={e => this.onChange(e)}
                  value={this.state.data}/>
              </div>

            </div>

            <p>
            Nacionalidade<br/>
            <input
              name="nac"
              type="text"
              placeholder="Nacionalidade"
              onChange={e => this.onChange(e)}
              value={this.state.nac}
              style={{minWidth: '200px'}}
            />
            </p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Número CC&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Número de Contribuinte<br/>
            <input
              name="cc"
              type="text"
              placeholder="Número do CC"
              onChange={e => this.onChange(e)}
              value={this.state.cc}
              style={{minWidth: '200px'}}
            />&nbsp;
            <input
              name="con"
              type="text"
              placeholder="Número de Contribuinte"
              onChange={e => this.onChange(e)}
              value={this.state.con}
              style={{minWidth: '200px'}}
            />
            <br/><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Género&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
            <input
              name="genero"
              type="radio"
              onChange={e => this.onChange(e)}
              value={this.state.gender}
            /> Feminino&nbsp;&nbsp;
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

        </div>
      </div>
    );
  }
}

export default InfoPessT;
