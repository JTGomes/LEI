import React from 'react';
import './css/infopess.css'
import {Input} from 'reactstrap';
class InfoPess extends React.Component {

  constructor(props) {
    super(props);
    if(props.data) {
        this.state = {
            nome: props.data.nome,
            password: props.data.password,
            data: props.data.data,
            nacionalidade: props.data.nacionalidade,
            cc: props.data.cc,
            con: props.data.con,
            gender: props.data.gender,
            escalao: props.data.escalao,
        }
    }else this.state = {
        nome: '',
        password: '',
        data: '',
        nacionalidade: '',
        cc: '',
        con: '',
        gender: '',
        escalao: '',
    }
  }

  onChange=(e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
    console.log(this.state.nome);
  }

  onSubmit(e){
    this.props.onNext(1,this.state);
    console.log("Passo 1");
  }

  render () {
    return (
      <div className="imagem">

        <div className="conteudo">
          <ul className="progressbar">
            <li><label className="texto">Informações Pessoais</label></li>
            <li>Contactos</li>
            <li>Documentos</li>
            <li>Confirmar Registo</li>
            <li>Registo FPA</li>
          </ul>
        </div>

        <div id="formulario">
          <h1>REGISTO DE ATLETAS</h1>
          <h3>Faça aqui o seu registo e torne-se atleta do SC Braga
          <form id="forms">
            <p>
            Nome<br/>
            <input
              name="nome"
              type="text"
              placeholder="Nome"
              onChange={e => this.onChange(e)}
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Género&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Escalão<br/>
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
            <select name="escalao"
                    value={this.state.value}
                    onChange={e => this.onChange(e)}
            >
              <option value="benjamima">Benjamim A</option>
              <option value="benjamimb">Benjamin B</option>
              <option value="infantil">Infantil</option>
              <option value="iniciado">Iniciado</option>
              <option value="juvenil">Juvenil</option>
              <option value="junior">Junior</option>
              <option value="sub23">Sub-23</option>
              <option value="senior">Senior</option>
              <option value="veteranos">Veterano</option>
            </select>
        </form>
          <form>
            <button id="seguinte"  onClick={(e) => this.onSubmit(e)}>
              Seguinte
            </button>

          </form>
          </h3>
        </div>
      </div>
    );
  }
}

export default InfoPess;
