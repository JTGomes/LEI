import React from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import InfoPess from './InfoPess.js'
import InfoPessT from './InfoPessT.js'
import * as routes from '../../constants/routes';
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
          <div className="row">
            <div className="col-lg-6 col-sm-12 left">
              <Link to={routes.REG_TREINADOR} onClick={this.disapear}>
                <p>
                  TREINADORES
                </p>
              </Link>
            </div>
            <div className="col-lg-6 col-sm-12 right">
              <Link to={routes.REG_ATLETA} onClick={this.disapear}>
                <p>
                  ATLETAS
                </p>
              </Link>
            </div>
          </div>
        </section>
        <Switch>
          <Route exact path={routes.REG_ATLETA} component={InfoPess}/>
          <Route exact path={routes.REG_TREINADOR} component={InfoPessT}/>
        </Switch>
      </div>
    );
  }
}

export default Choose;
