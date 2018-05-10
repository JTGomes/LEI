import React from 'react';
import ModalEditInfo from './component/modalPersonal';
import ModalEditDocs from './component/modalDocs';
import FaEdit from 'react-icons/lib/fa/edit';
import "./css/Tpersonaldata.css";

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
      },
      modalDataEdit: false,
      modalDocs: false,
    };
    this.toggleDE = this.toggleDE.bind(this);
    this.toggleD = this.toggleD.bind(this);
  }

  toggleDE(){
    this.setState({
      modalDataEdit: !this.state.modalDataEdit,
    })
  }

  toggleD(){
    this.setState({
      modalDocs: !this.state.modalDocs,
    })
  }

  initModalDados(){
    this.setState({
      modalDataEdit: true,
    })
  }

  initModalDocs(){
    this.setState({
      modalDocs: true,
    })
  }


  render() {
    return (
      <div className="aboutcoach container-fluid">
        <a className="Title">Dados Pessoais <FaEdit onClick={()=>this.initModalDados()} style={{cursor:'pointer'}}/></a>
        <hr />
        <div className="gridcontent">
          <a>Nome Completo: {this.state.data.name} </a>
          <a>Género: {this.state.data.genero} </a>
          <a>NIF {this.state.data.nif} </a>
          <a>Nacionalidade: {this.state.data.nacionalidade} </a>
          <a>Morada: {this.state.data.morada} </a>
          <a>Código Postal: {this.state.data.codigopostal} </a>
          <a>Localidade: {this.state.data.local} </a>
          <a>Sócio: {this.state.data.socio} </a>
        </div>
        <a className="Title">Dados de Filiação</a>
        <hr />
        <div className="gridcontent">
          <a>Contrato até: {this.state.contrato.end} </a>
          <a>Salário: {this.state.contrato.salario} </a>
        </div>
        <a className="Title">Documentos <FaEdit onClick={()=>this.initModalDocs()} style={{cursor:'pointer'}}/></a>
        <hr />
        <div className="gridcontent">
          <a>Cartão de Cidadão: {this.state.doc.cc} </a>
          <a>Exame Médico: {this.state.doc.em} </a>
        </div>
        <ModalEditInfo toggle={this.toggleDE} modalDataEdit={this.state.modalDataEdit} />
        <ModalEditDocs toggle={this.toggleD} modalDocs={this.state.modalDocs} />
      </div>
    );
  }
}

export default TPersonalDataFrame
