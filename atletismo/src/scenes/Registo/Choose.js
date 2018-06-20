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
    if( regdata[i]) {
        regdata[i] = data;
        this.setState({
            registerData: regdata,
            passo: state+1
        })
    }else{
        regdata.push(data);
        this.setState({
            registerData: regdata,
            passo: state+1
        });
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
  // Slata para o state i,dados presente no estado atual
    goTo(i,data){

    }

  renderChoice(){
    return (
      <section className="intro" id='intro'>
        <div className="row">
          <div className="col-lg-6 col-sm-12 left">
            <img src="/images/coach.png" alt="test"/>
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
        return (<ConfirmarT onNext={this.onNext} onPrev={this.onPrev} data={this.state.registerData[state-1]}/>);
      case 5:
        return (<FPAT onNext={() => this.onEnd(this.state.registerData)} onPrev={this.onPrev} data={this.state.registerData[state-1]}/>)
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
        return (<Confirmar onNext={this.onNext} onPrev={this.onPrev} data={this.state.registerData[state-1]}/>);
      case 5:
        return (<FPA onNext={() => this.onEnd(this.state.registerData)} onPrev={this.onPrev} data={this.state.registerData[state-1]}/>);
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
      <div>
        {this.renderSwitch(this.state.passo)}
      </div>
    );
  }
}

export default Choose;
