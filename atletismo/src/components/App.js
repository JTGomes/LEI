import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as routes from '../constants/routes';
import Home from '../scenes/diretor/Home';
import AppDiretor from './AppDiretor';
import AppAtleta from './AppAtleta';
import Choose from '../scenes/Registo/Choose.js'
import AppTreinador from './AppTreinador';
//import Registo from '../scenes/Registo';
import Login from '../scenes/Login';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
        estado:0
    };
    this.changeState = this.changeState.bind(this);
    this.criaConta = this.criaConta.bind(this);
  }

  changeState(newState){
      this.setState({
        estado: newState
      })    
  }

  criaConta(){
    console.log("hello");
    this.changeState(1);
  }

  switchState(state){

    switch(state){
        case 1: 
                return (<Choose onEnd={(data)=>{console.log(data);this.changeState(0);}}/>)
        case 2:
                return (<AppAtleta onLogOut={() => this.changeState(0)}/>);
        case 3:
                return (<AppTreinador onLogOut={() => this.changeState(0)} />);
        case 4:
              return  (<AppDiretor onLogOut={() => this.changeState(0)} />);
        default:
                return (<Login onLogin={ (k) => this.changeState(k)} criaConta={this.criaConta}/>)
    }
  }

  render() {

    return (
     <div>
        <div id="buttons">
            <a onClick={() => this.changeState(3)} target="_self">
                <button>
                    Treinador
                </button>
            </a>
            <a onClick={() => this.changeState(2)}>
                <button>
                    Atleta
                </button>
            </a>
            <a onClick={() => this.changeState(4)}>
                <button>
                    Dirigentes
                </button>
            </a>
        </div>
        <BrowserRouter>
        {this.switchState(this.state.estado)}
        </BrowserRouter>
     </div>
    );
  }
}

export default App;