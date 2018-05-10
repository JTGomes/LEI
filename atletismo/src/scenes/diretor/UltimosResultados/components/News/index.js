import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalTitle, ModalHeader, ModalFooter } from 'reactstrap';
import jsPDF from 'jspdf';
// import $ from 'jquery';

class News extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      titulo: 'ATLETISMO SPORTING CLUBE DE BRAGA',
      inicio: ["O", "Novamente o" ,"Uma jornada notável para o", "Uma grande jornada para o"],
      maissucesso: ["O atletismo nacional continua em grande destaque","O atletismo nacional mais uma vez mostra a sua qualidade", "O atletismo nacional volta a conseguir um grande resultado", "Continua a caminhada vitoriosa do atletismo nacional"],
      df: [", desta feita na prova,","desta feita no certame","na prova","no certame"],
      clube: ["Atletismo do Sporting Clube de Braga","Atletismo do SCB"],
      termos: ["alcançou,","conquistou,","que conseguiu,"],
      escalao: ["inserida no escalão","no escalão"],
      weekend: ["este fim-de-semana", "no decorrer deste fim-de-semana"],
      week: ["esta semana","no decorrer desta semana"],
      conquista: ["A conquista de",""],
      masculino: ["Destaque no setor masculino para","O atleta do Sporting Clube de Braga","O atleta","No setor masculino o SCB, foi representado nesta prova, pelos seguintes ateltas:","No setor masculino"],
      feminino: ["Destaque no setor feminino para","A atleta do Sporting Clube de Braga","A atleta","No setor feminino o SCB, foi representado nesta prova, pelas seguintes atletas:","No setor feminino"],
      marca: ["com uma marca de"],
      resultado: ["um brilhante", "um magnífico"],
      esp: ["na especialidade de","na prova de"],
      ligacao: ["mais uma excelente prestação através dos seus atletas.","novo resultado relevante através dos seus atletas.","um brilhante desempenho desportivo através dos seus atletas.","novamente uma excelente prestação através dos seus atletas."],
      sucesso: ["Mais uma grande jornada para o Atletismo do Sporting Clube de Braga.","Mais uma jornada notável para o atletismo do Sporting Clube de Braga.","O Sporting Clube de Braga alcançou mais uma vez uma excelente prestação.","Este resultado premeia o excelente desempenho do SCB.","Este desempenho perspetiva mais uma época de sucesso para a modalidade à imagem dos anos anteriores."],
      showModal: false,
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  rand(a) {
    let i = (a).length;
    const j = Math.floor(Math.random() * i);
    return a[j];
  }

  click () {
    var doc = new jsPDF()
    var test = 'Chupamos'
	  // doc.fromHTML($('#news').html(), 15, 15, {
    //   'width': 170,
    // });
    doc.text(test),
    doc.save('Noticia.pdf');
  };

  render() {

    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
        <i className="far fa-newspaper"></i>
        </Button>

        <Modal isOpen={this.state.showModal} toggle={this.close}>
          <ModalHeader closeButton>
            <ModalTitle>Notícias</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <div id="news">

            <p>{this.state.titulo}</p>
            <p>{this.rand(this.state.inicio)} {this.rand(this.state.clube)} {this.rand(this.state.termos)} {this.rand(this.state.week)} {this.rand(this.state.ligacao)} {this.rand(this.state.maissucesso)} {this.rand(this.state.df)} {this.props.component.original.prova}</p>
            <p>{this.rand(this.state.feminino)} {this.props.component.original.nome} {this.rand(this.state.termos)} {this.rand(this.state.marca)} {this.props.component.original.resultado} {this.rand(this.state.resultado)} {this.props.component.original.classificacao} {this.props.component.original.local} {this.rand(this.state.esp)} {this.props.component.original.especialidade} {this.rand(this.state.escalao)} {"ESCALÃO"}</p>
            <p>{this.rand(this.state.masculino)} {this.props.component.original.nome} {this.rand(this.state.termos)} {this.rand(this.state.marca)} {this.props.component.original.resultado} {this.rand(this.state.resultado)} {this.props.component.original.classificacao} {"lugar"} {this.rand(this.state.esp)} {this.props.component.original.especialidade} {this.rand(this.state.escalao)} {"ESCALÃO"}</p>
            <p>{this.rand(this.state.sucesso)}</p>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.click}>Guardar</Button>
            <Button onClick={this.close}>Fechar</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default News;
