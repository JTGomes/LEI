import React from 'react';
import { BrowserRouter, Switch, Route, WrappedLink, Link } from 'react-router-dom'
import InfoPess from './InfoPess.js'
import InfoPessT from './InfoPessT.js'
import './css/choose.css'

class Choose extends React.Component {

  disapear(){
    document.getElementById("intro").style = "display:none";
     document.getElementById("buttons").style = "display:none";
  }

  render () {
    return (
      <div>
  <section className="intro" id='intro'>
    <row>
      <div className="col-lg-6 col-sm-12 left">
      <Link to='/InfoPessT' onClick={this.disapear}>
        <p>
          TREINADORES
        </p>
        </Link>
      </div>
      <div className="col-lg-6 col-sm-12 right">
      <Link to='/InfoPess' onClick={this.disapear}>
        <p>
          ATLETAS
        </p>
        </Link>
      </div>
    </row>
  </section>
  <Switch>
    <Route path='/InfoPess' component={InfoPess}/>
    <Route path='/InfoPessT' component={InfoPessT}/>
  </Switch>
      </div>
    );
  }
}

export default Choose;
