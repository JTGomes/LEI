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
            nccidadao: props.data.nccidadao,
            nif: props.data.nif,
            gender: props.data.gender,
            escalao: props.data.escalao,
        }
    }else this.state = {
        nome: '',
        password: '',
        data: '',
        nacionalidade: '',
        nccidadao: '',
        nif: '',
        gender: '',
        escalao: 'benjamina',
    };
  }

  onChange=(e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  };

  onSubmit(e){
    this.props.onNext(1,this.state);
  }

  onChangeCCNIF(e) {
    if(e.target.value.length<10 && !isNaN(e.target.value))
      this.setState({
        [e.target.name]: e.target.value,
      });
  }

  render () {
    return (
      <div className="imagem">
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
                name="nacionalidade"
                type="text"
                placeholder="Nacionalidade"
                onChange={e => this.onChange(e)}
                value={this.state.nacionalidade}
                style={{minWidth: '200px'}}
              />
            </p>
            <p>
              Número Cartão de Cidadão/BI<br/>
              <input
                name="nccidadao"
                type="text"
                placeholder="Número do CC"
                onChange={e => this.onChangeCCNIF(e)}
                value={this.state.nccidadao}
                style={{minWidth: '200px'}}
              />
            </p>
            <p>
              Número de Contribuinte<br/>
              <input
                name="nif"
                type="text"
                placeholder="Número de Contribuinte"
                onChange={e => this.onChangeCCNIF(e)}
                value={this.state.nif}
                style={{minWidth: '200px'}}
              />
            </p>
            <p>
              Género<br/>
              <input
                name="gender"
                type="radio"
                onChange={e => this.onChange(e)}
                value={"feminino"}
              /> Feminino{' '}
              <input
                name="gender"
                type="radio"
                onChange={e => this.onChange(e)}
                value={"masculino"}
              /> Masculino
            </p>
            Escalão<br/>
            <select
              name="escalao"
              defaultValue={ this.state.escalao ? this.state.escalao: "benjamina"}
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
