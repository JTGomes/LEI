import React from 'react';
import InfoPess from './InfoPess.js'
import InfoPessT from './InfoPessT.js'
import './css/choose.css'
import Confirmar from "./Confirmar";
import ConfirmarT from "./ConfirmarT";
import Contactos from "./Contactos.js";
import ContactosT from "./ContactosT.js";
import Documentos from "./Documentos.js";
import DocumentosT from "./DocumentosT.js";
import FPA from "./FPA.js";
import FPAT from "./FPAT.js";
import axios from 'axios';

class Choose extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       registerData: [],
       passo:0,
       caminho:undefined
    };
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }



  disapear(){
    document.getElementById("intro").style = "display:none";
  }

  // Passo presente e dados
  onNext(state,data){
    let regdata = [...this.state.registerData];
    const i = state -1;//0 até 4 no array e não 1 a 5
    if(state === 4){
        const error = this.send(this.state.registerData);
        if( error) {
            error.then(e => {
                console.log(e);
                return e;
            }).then(b => {
                    regdata[i] = data;
                    this.setState({
                        registerData: regdata,
                        passo: state + 1
                    });
            }).catch(erro => alert("Os dados introduzidos são invalidos. Verifica que preencheu corretamente os campos e que o email não está a ser usado"));
        }
    }else {
        if (regdata[i]) {
            regdata[i] = data;
            this.setState({
                registerData: regdata,
                passo: state + 1
            })
        } else {
            regdata.push(data);
            this.setState({
                registerData: regdata,
                passo: state + 1
            });
        }
    }

    console.log(i + "  " + state);
  }
  // Passo presente e dados na pagina
    onPrev(state,data){
      let regdata = [...this.state.registerData];
      const i = state -1;//0 até 4
      if( regdata[i] ) {
          regdata[i] = data;
          this.setState({
              registerData: regdata,
              passo: i
          })
      }else {
          regdata.push(data);
          this.setState({
              registerData: regdata,
              passo: i
          });
      }
      console.log(this.state.registerData);
  }

  // Salta para o state i,dados presente no estado atual
    goTo(i,data){

    }

    send(dadosRegisto){
        let dados = {};
        dadosRegisto.forEach( s => {
            const entries = Object.entries(s);
            entries.forEach( e => dados[e[0]] = e[1]);
        });
        let error;
        console.log(dados);
        console.log(this.state.caminho);

        if( this.state.caminho === 'atleta') {
            if( !dados['email'] || !dados['password'] || !dados['nome'] || !dados['nccidadao'] || !dados['data'] || !dados['escalao']
                || !dados['cc'] || !dados['am'] || !dados['foto'] ||  !dados['nif'] || !dados['morada'] || !dados['localidade'] || !dados['gender']
                || !dados['nacionalidade'] || !dados['postal'] || !dados['telemovel']   ) {
                alert("Faz o favor de inserir todos os dados pedidos.");
            }else {
                error = axios.post('http://localhost:3000/api/Users/signupAtleta', {
                    email: dados['email'],
                    password: dados['password'],
                    nome: dados['nome'],
                    nrdocumento: dados['nccidadao'],
                    tipoDocumento: "cartao de cidadao",
                    dataNascimento: dados['data'],
                    escalao: dados['escalao'],
                    cartaoCidadao: dados['cc'],
                    exameMedico: dados['am'],
                    fotoPerfil: dados['foto'],
                    nif: dados['nif'],
                    morada: dados['morada'],
                    localidade: dados['localidade'],
                    genero: dados['gender'],
                    nacionalidade: dados['nacionalidade'],
                    codigoPostal: dados['postal'],
                    telemovel: dados['telemovel'],
                    socio: dados['socio'],
                    nsocio: dados['nsocio'],
                    redes: JSON.stringify(dados['redes'])
                }).then(ans => console.log('Enviado'));
                fetch('http://localhost:4500/api/User/uploads/',{
                    method: 'POST',
                    body: dados['fileData']
                }).then( answer => console.log(answer));
            }

        }
        else if( this.state.caminho === 'treinador'){
            if( !dados['email'] || !dados['password'] || !dados['nome'] || !dados['nccidadao'] || !dados['data'] || !dados['ipdj']
                || !dados['cc'] || !dados['am'] || !dados['foto'] ||  !dados['nif'] || !dados['morada'] || !dados['localidade'] || !dados['gender']
                || !dados['nacionalidade'] || !dados['postal'] || !dados['telemovel'] || ! dados['ntreinador']  ) {
                alert("Faz o favor de inserir todos os dados pedidos.");
            }else {
                error = axios.post('http://localhost:3000/api/Users/signupTreinador', {
                    nif: dados['nif'],
                    email: dados['email'],
                    morada: dados['morada'],
                    localidade: dados['localidade'],
                    ipdj: dados['ipdj'],
                    genero: dados['gender'],
                    nacionalidade: dados['nacionalidade'],
                    codPostal: dados['postal'],
                    socio: dados['nsocio'],
                    telemovel: dados['telemovel'],
                    cartaoCidadao: dados['cc'],
                    exameMedico: dados['am'],
                    ntreinador: dados['ntreinador'],
                    nome: dados['nome'],
                    password: dados['password'],
                    foto: dados['foto'],
                    nccidadao: dados['nccidadao']
                }).then(ans => console.log('Enviado'));
                fetch('http://localhost:4500/api/User/uploads/',{
                    method: 'POST',
                    body: dados['fileData']
                }).then( answer => console.log(answer));
            }
        }
        return error;
    }

    onEnd(){
      console.log(this.props.location);
      console.log(this.props.history);
      this.props.history.push("");
    }


  renderChoice(){
    return (
      <section className="intro" id='intro'>
        <div className="row">
          <div className="col-lg-6 col-sm-12 left">
            <button onClick={() =>{ this.disapear();this.setState({ passo:1, caminho:"treinador"});}}>
              <p>TREINADORES</p>
            </button>
          </div>
          <div className="col-lg-6 col-sm-12 right">
              <button onClick={() => {this.disapear();this.setState({ passo:1, caminho:"atleta"});}}>
                <p>ATLETAS</p>
              </button>
          </div>
        </div>
      </section>
    )
  }

  switchTreinador(state) {
    switch (state) {
      case 1:
        return (<InfoPessT onNext={this.onNext} data={this.state.registerData[state-1]}/>);
      case 2:
        return (<ContactosT onNext={this.onNext} onPrev={this.onPrev} data={this.state.registerData[state-1]}/>);
      case 3:
        return (<DocumentosT onNext={this.onNext} onPrev={this.onPrev}  data={this.state.registerData[state-1]}/>);
      case 4:
        return (<ConfirmarT onNext={this.onNext} onPrev={this.onPrev} data={this.state.registerData}/>);
      case 5:
        return (<FPAT onNext={() => this.onEnd(this.state.registerData)} onPrev={this.onPrev}/>)
      default:
        return -1;
    }
  }
  switchAtleta(state){
    switch (state) {
      case 1:
        return (<InfoPess onNext={this.onNext} data={this.state.registerData[state-1]}/>);
      case 2:
        return (<Contactos onNext={this.onNext} onPrev={this.onPrev} data={this.state.registerData[state-1]}/>);
      case 3:
        return (<Documentos onNext={this.onNext} onPrev={this.onPrev} data={this.state.registerData[state-1]}/>);
      case 4:
        return (<Confirmar onNext={this.onNext} onPrev={this.onPrev} data={this.state.registerData}/>);
      case 5:
        return (<FPA onNext={() => this.onEnd(this.state.registerData)} onPrev={this.onPrev}/>);
      default:
        return -1;
    }
  }

  renderSwitch(state){
    if( state === 0 && this.state.caminho === undefined){
      return this.renderChoice();
    }
    else{
      if( this.state.caminho === "treinador")
        return this.switchTreinador(state);
      else if(this.state.caminho==="atleta") return this.switchAtleta(state);
        else return (<div> Good try man.</div>);
    }
  }

  render () {
    return (
      <div className={"background"}>
        {this.renderSwitch(this.state.passo)}
          <button className={"sair"} onClick={e => this.onEnd()}>
              Sair
          </button>
      </div>
    );
  }
}

export default Choose;
