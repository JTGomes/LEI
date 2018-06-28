import React from 'react';
import { Link, WrappedLink } from 'react-router-dom'
import './css/fpa.css'
//import { withRouter } from 'react-router-dom'

class FPA extends React.Component {
  render () {
    return (
      <div className="imagem">
        <p className="fpa-title">REGISTO NA PLATAFORMA DA FEDERAÇÃO PORTUGUESA DE ATLETISMO</p>
        <p className="fpa-content">Já se inscreveu na plataforma da FPA (Federação Portuguesa de Atletismo)? Se já o fez clique em "Sim", caso não o tenha feito clique em "Fazer Registo", para proceder ao mesmo.</p>
        <div id="buttons">
          <form>
            <button id="anterior"  onClick={(e) => this.props.onNext()}>
              <Link to={"/h"}>
                Sim
              </Link>
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

export default FPA;
