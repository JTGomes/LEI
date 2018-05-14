import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import jsPDF from 'jspdf';


class News extends Component {

  constructor(props) {
    super(props);

    this.toggle=this.toggle.bind(this);

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
      value: '',
    };
  }

  toggle(){
    this.setState({
      showModal: !this.state.showModal,
      value: this.getText(),
    })
  }

  getText(){
    return `${this.state.titulo}

    ${this.rand(this.state.inicio)} ${this.rand(this.state.clube)} ${this.rand(this.state.termos)} ${this.rand(this.state.week)} ${this.rand(this.state.ligacao)} ${this.rand(this.state.maissucesso)} ${this.rand(this.state.df)} ${this.props.component.original.prova}
    ${this.rand(this.state.feminino)} ${this.props.component.original.nome} ${this.rand(this.state.termos)} ${this.rand(this.state.marca)} ${this.props.component.original.resultado} ${this.rand(this.state.resultado)} ${this.props.component.original.classificacao} ${this.props.component.original.local} ${this.rand(this.state.esp)} ${this.props.component.original.especialidade} ${this.rand(this.state.escalao)} ${"ESCALÃO"}
    ${this.rand(this.state.masculino)} ${this.props.component.original.nome} ${this.rand(this.state.termos)} ${this.rand(this.state.marca)} ${this.props.component.original.resultado} ${this.rand(this.state.resultado)} ${this.props.component.original.classificacao} lugar ${this.rand(this.state.esp)} ${this.props.component.original.especialidade} ${this.rand(this.state.escalao)} ${"ESCALÃO"}
    ${this.rand(this.state.sucesso)}
              `;
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  rand(a) {
    return a[Math.floor(Math.random() * (a).length)];
  }

  saveFile () {
    var doc = new jsPDF();
    doc.setFontSize(12);
    var splitText = doc.splitTextToSize(this.state.value, 180);
    doc.text(20,20,splitText);
    doc.save('Noticia.pdf');
  };

  handleChange(nvalue){
    this.setState({value:nvalue})
  }




  render() {



    return (
      <div>

        <Button
        color="secondary"
        size="lg"
        onClick={this.toggle}
        >
        <i className="far fa-newspaper"></i>
        </Button>

        <Modal isOpen={this.state.showModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Notícias
          </ModalHeader>
          <ModalBody>
          <div id="news">
            <Input type="textarea" name="text" id="exampleText" value={this.state.value} rows={20} onChange={(event)=>this.handleChange(event.target.value)}/>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.saveFile()}>Guardar</Button>
            <Button onClick={this.toggle}>Fechar</Button>
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default News;
