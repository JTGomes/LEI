import React from 'react';
import 'react-table/react-table.css'
import Table from "./TResultsTable.js";

import './css/TResultsFrame.css';

class TResultsFrame extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data : [{
        nome:"Patricia",
        nomeCompeticao:"Jogos Olimpicos",
        ano:"2008",
        modalidade:"100m",
        posicao:"1º lugar",
        album:"AtletaAlbum/GAFASA"
      },{
        nome:"Patricia",
        nomeCompeticao:"Jogos Olimpicos",
        ano:"2004",
        modalidade:"100m",
        posicao:"1º lugar",
        album:"AtletaAlbum/GAFASA"
      },
      {
        nome:"Carlos",
        nomeCompeticao:"Corrida do coração",
        ano:"1999",
        modalidade:"2Km",
        posicao:"20º lugar",
        album:"AtletaAlbum/GAFASA"
      }],
      anoDesde: "Desde",
      anoAte:"Até",
      nomeSelecionado:"-",
      modalidadeSelecionada:"-"
    }
  }

  renderDateSelectDesde(){
    let datas = new Set();
    this.state.data.forEach( (resultado) => datas.add(resultado.ano) );
    const unique_values = [...datas].sort((a,b) => Number(a) - Number(b));
    return (
      unique_values.map( (value) => <option id={value} key={value}> {value} </option>)
    );
  }

  renderDateSelectAte(){
    let datas = new Set();
    this.state.data.forEach( (resultado) => datas.add(resultado.ano) );
    const unique_values = [...datas].sort((a,b) =>  Number(b)- Number(a));
    return (
      unique_values.map( (value) => <option id={value} value={value} key={value}> {value} </option>)
    );
  }

  renderAtletaSelect() {
    let nomes = new Set();
    this.state.data.forEach( (resultado) => nomes.add(resultado.nome));
    const unique_values = [...nomes];
    return (
      unique_values.map( (value) => <option id={value} value={value} key={value}> {value}</option>)
    );
  }

  renderModalidadeSelect(){
    let modalidades = new Set();
    this.state.data.forEach( (resultado) => modalidades.add(resultado.modalidade));
    const unique_values = [...modalidades];
    return (
      unique_values.map( (value) => <option id={value} value={value} key={value}> {value}</option>)
    );
  }

  filter(data){
    let d = data;
    if( this.state.nomeSelecionado !== "-")
        d = data.filter((a) => a.nome === this.state.nomeSelecionado);
    if( this.state.modalidadeSelecionada !== "-")
        d = d.filter( (a) => a.modalidade === this.state.modalidadeSelecionada);
    if( this.state.anoAte !== "Até")
        d = d.filter( (a) => Number(a.ano) <= Number(this.state.anoAte));
    if( this.state.anoDesde !== "Desde")
        d = d.filter( (a) => Number(a.ano) >= Number(this.state.anoDesde));
    return d;
  }

  render(){
    return (
      <div className="container-fluid">
        <div className="table-top">
          <div className="table-top-left">
            <p> Intervalo de Tempo </p>
            <a>Desde </a>
            <select
              id="desdeselect"
              name="Desde"
              defaultValue="Desde"
              onChange={
                () => {
                  const doc = document.getElementById("desdeselect");
                  this.setState({
                    anoDesde: doc.options[doc.selectedIndex].value
                  });
                }
              }
            >
              <option id="desde" value="Desde" key="Desde">-</option>
              {this.renderDateSelectDesde()}
            </select>
            <a> Até </a>
            <select
              id="ateselect"
              name="Até"
              defaultValue="Até"
              onChange={
                () => {
                  const doc = document.getElementById("ateselect");
                  this.setState({
                    anoAte: doc.options[doc.selectedIndex].value
                  });
                }
              }
            >
              <option id="ate" value="Ate" >-</option>
              {this.renderDateSelectAte()}
            </select>
          </div>
          <div className="table-top-right">
            <p> Atleta </p>
            <select
              id="atletasselect"
              name=""
              defaultValue="-"
              onChange={
                () => {
                  const doc = document.getElementById("atletasselect");
                  this.setState({
                    nomeSelecionado: doc.options[doc.selectedIndex].value
                  });
                }
              }
            >
              <option id="none" value="-" > - </option>
              {this.renderAtletaSelect()}
            </select>
          </div>
          <div className="table-top-right">
            <p> Modalidade </p>
              <select
                id="modalidadeSelect"
                defaultValue="-"
                onChange={
                  () => {
                    const doc = document.getElementById("modalidadeSelect");
                    this.setState({
                      modalidadeSelecionada: doc.options[doc.selectedIndex].value
                    });
                  }
                }
              >
                <option id="none" value="-" > - </option>
                {this.renderModalidadeSelect()}
              </select>
            </div>
          </div>
        <Table data={this.filter(this.state.data)}/>
      </div>
    );
  }
}

export default TResultsFrame;