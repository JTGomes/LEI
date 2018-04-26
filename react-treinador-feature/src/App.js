import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import TPersonalDataFrame from './components/TPersonalDataFrame.js'
import TPlayersFrame from './components/TPlayersFrame.js'
import TResultsFrame from './components/TResultsFrame.js'
import TRCalenderFrame from './components/TRCalenderFrame.js'
import TOtherFrame from './components/TOtherFrame.js'


class App extends Component {
  render() { 
    return ( 
      <div>
        <Switch>
          <Route exact path='/DadosPessoais' component={TPersonalDataFrame}/>
          <Route path='/Atletas' component={TPlayersFrame}/>
          <Route path='/Resultados' component={TResultsFrame}/>
          <Route path='/Calendario' component={TRCalenderFrame}/>
          <Route path='/Other' component={TOtherFrame}/>      
        </Switch>
        <div id="buttons">

          <a href="/DadosPessoais" target="_self">
           <button>
             Dados Pessoais
            </button>
          </a>
          <a href="./Atletas"> 
           <button>
            Meus Atletas 
            </button>
          </a>
          <a href='./Resultados'>
            <button>
              Resultados 
            </button>
          </a>
          <a href='./Calendario'>
           <button>
             Calendario 
            </button>
          </a>
          <a href='./Other'>
            <button>
            Other
            </button>
          </a>
        </div>

      </div>)
  }
}

export default App;
