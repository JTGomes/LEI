import React from 'react';
import "./Tpersonaldata.css";

class TPersonalDataFrame extends React.Component {
  
	constructor(props){
		super(props);
		this.state = {
			data: { 
				name: "José Mário dos Santos Mourinho Félix" ,
				genero: "Masculino",
				nif: "123789456",
				nacionalidade: "Portuguesa",
				morada: "Rua Doutor Alberto Sampaio, 67",
				codigopostal: "4815-689" ,
				local: "Braga" ,
				socio: "sim"
			},
			contrato: {
				end: "01/09/2018",
				salario:"30500€"
			},
			doc: {
				cc:"/",
				em:"/"
			}
		};
	}


  render() {
    return (
      <div>
      	<div id="dados_pessoais">
      		<h1> Dados Pessoais</h1>
      		<div id="campos">
      		<p id="spanme"> Nome Completo: 
      			<span> {this.state.data.name} </span>
      		</p>
      		<p id="spanme"> Género: 
      			 <span> {this.state.data.genero} </span>
      		</p>
      		<p id="spanme"> NIF:
      			 <span> {this.state.data.nif} </span>
      		</p>
      		<p id="spanme"> Nacionalidade: 
      			 <span> {this.state.data.nacionalidade} </span>
      		</p>
      		<p id="spanme"> Morada 
      			 <span> {this.state.data.morada} </span>
      		</p>
      		<p id="spanme"> Código Postal: 
      			 <span> {this.state.data.codigopostal} </span>
      		</p>
      		<p id="spanme"> Localidade 
      			 <span> {this.state.data.local} </span>
      		</p>
      		<p id="spanme"> Sócio 
      			 <span> {this.state.data.socio} </span>
      		</p>
      		</div>
      	</div>
      	<div id="dados_filiação">
      		<h1> Dados Pessoais</h1>
      		<div id="campos">
      		<p id="spanme"> Contrato até: 
      			<span> {this.state.contrato.end} </span>
      		</p>
      		<p id="spanme"> Salário:
      			<span> {this.state.contrato.salario} </span>
      		</p>
      		</div>
      	</div>
      	<div id="documentos">
      		<h1> Dados Pessoais</h1>
      		<div id="campos">
      			<p> 
      				<a href={this.state.doc.cc}> Cartão de Cidadão </a>
      			</p>
      			<p>
      				<a href={this.state.doc.em}> Exames médicos </a>
      			</p>
      		</div>
      		<div id="file_submit">
      			<div id="sub">
      				<img src="http://img.freepik.com/icones-gratis/arquivo-na-pasta_318-77855.jpg?size=338&ext=jpg" alt="aaa" />
      				<input type="file" name="Escolher Ficheiro" size="40"/>
      			</div>
      			<div id="sub">
      				<img src="http://img.freepik.com/icones-gratis/arquivo-na-pasta_318-77855.jpg?size=338&ext=jpg" alt="aaa" />
      				<input type="file" name="Escolher Ficheiro" size="40"/>
      			</div>
      		</div>


      	</div>
      </div>
    );
  }
}

export default TPersonalDataFrame
