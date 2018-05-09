import React from 'react';
import { Link, WrappedLink } from 'react-router-dom'
//import './css/fpa.css'

class FPAT extends React.Component {
  render () {
    return (
      <div>

      	<div className="container">
		<ul className="progressbar">
			<li className="active">Informações Pessoais</li>
			<li className="active">Contactos</li>
			<li className="active">Documentos</li>
			<li className="active">Confirmar Registo</li>
			<li><label className="texto">Registo FPA</label></li>
		</ul>
	</div>

      <h1>REGISTO NA PLATAFORMA DA FEDERAÇÃO PORTUGUESA DE ATLETISMO</h1>
      <h3>Já se inscreveu na plataforma da FPA (Federação Portuguesa de Atletismo)? Se já o fez clique em "Sim", caso não o tenha feito clique em "Fazer Registo", para proceder ao mesmo.</h3>

      <div id="buttons">
      <form>
      <Link to='/ConfirmarT'>
        <button id="anterior">
          Sim
        </button>
      </Link>
      <Link to='https://lince.fpatletismo.pt/'>
        <button id="seguinte">
          Fazer Registo
        </button>
      </Link>
      </form>
      </div>
      </div>
    );
  }
}

export default FPAT;
