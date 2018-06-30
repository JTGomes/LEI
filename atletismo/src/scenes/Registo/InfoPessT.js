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
          nccidadao: props.data.nccidadao,
          nif: props.data.nif,
          gender: props.data.gender,
      }
    }else this.state = {
        nome: '',
        password: '',
        data: '',
        nacionalidade: '',
        nccidadao: '',
        nif: '',
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
    }

  render () {
    return (
      <div className="imagem">

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
              name="nacionalidade"
              type="text"
              placeholder="Nacionalidade"
              onChange={e => this.onChange(e)}
              value={this.state.nacionalidade}
              style={{minWidth: '200px'}}
            />
            </p>
            <p>
            Número CC<br/>
            <input
              name="nccidadao"
              type="text"
              placeholder="Número do CC"
              onChange={e => this.onChange(e)}
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
              onChange={e => this.onChange(e)}
              value={this.state.nif}
              style={{minWidth: '200px'}}
            />
            </p>
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
