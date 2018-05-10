import React from 'react';
import TAdicionarArquivos from './TAddicionarArquivos'
import TEnviarEmail from './TEnviarEmail.js'
import MyComponent from "./FacebookTest.js";
import Arrow from 'react-icons/lib/fa/arrow-circle-left';

class TOtherFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected:0
        }
        this.changeSelected = this.changeSelected.bind(this);
    }

    changeSelected(value){
        this.setState({
            selected:value
            }
        );
    }

    renderOptionSelect(){
        return (
            <ul>
                <li value={1} style={{cursor:'pointer'}} onClick={(value) => this.changeSelected(value.target.value)}> Adicionar Arquivos</li>
                <li value={2} style={{cursor:'pointer'}}> Modificar dados pessoais</li>
                <li value={3} style={{cursor:'pointer'}}> Enviar email</li>
                <li value={4} style={{cursor:'pointer'}}> Enviar notificações</li>
                <li value={5} style={{cursor:'pointer'}}> Ver mensagens </li>
            </ul>
        );
    }

    renderPage(selected){

        switch(selected){
            case 1:
                    return (<div><Arrow onClick={() => this.changeSelected(0)} /><TAdicionarArquivos /></div>);
            case 2:
                    return (<div><Arrow onClick={() => this.changeSelected(0)} /></div>);
            case 3:
                    return (<TEnviarEmail />);
            case 4:
                    break;
            case 5:

                    break;
            default:
                    return this.renderOptionSelect();

        }
        return (<div></div>);
    }


  render() { // Lista de opções
    return (
      <div className={'container-fluid'}>
          {this.renderPage(this.state.selected)}
          <MyComponent />
      </div>
    );
  }
}

export default TOtherFrame;