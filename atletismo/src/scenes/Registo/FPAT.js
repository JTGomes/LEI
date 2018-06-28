import React from 'react';
//import { Link, WrappedLink } from 'react-router-dom'
import './css/fpa.css'

class FPAT extends React.Component {
  render () {
    return (
      <div>


      <h1>REGISTO NA PLATAFORMA DA FEDERAÇÃO PORTUGUESA DE ATLETISMO</h1>
      <h3>Já se inscreveu na plataforma da FPA (Federação Portuguesa de Atletismo)? Se já o fez clique em "Sim", caso não o tenha feito clique em "Fazer Registo", para proceder ao mesmo.</h3>

      <div id="buttons">
      <form>
        <button id="anterior" onClick={(e) => this.props.onNext()}>
          Sim
        </button>
        <a className={"button"} id="seguinte" href={"https://lince.fpatletismo.pt/publico/registo.aspx"} target={"_blank"} onClick={(e) => this.props.onNext()}>
                Fazer Registo
        </a>
      </form>
      </div>
      </div>
    );
  }
}

export default FPAT;
