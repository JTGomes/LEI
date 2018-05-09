import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as routes from '../../constants/routes';
import Home from '../../scenes/diretor/Home';
import AppDiretor from '../../components/AppDiretor';
import AppAtleta from '../../components/AppAtleta';
import AppTreinador from '../../components/AppTreinador';
import Choose from './Choose';
import Login from './Login';
import InfoPess from './InfoPess';
import Contactos from './Contactos';
import Documentos from './Documentos';
import Confirmar from './Confirmar';
import FPA from './FPA';
import InfoPessT from './InfoPessT';
import ContactosT from './ContactosT';
import DocumentosT from './DocumentosT';
import ConfirmarT from './ConfirmarT';
import FPAT from './FPAT';

class App extends Component {
  // <Route exact path={routes.REGISTAR} component={Registo} />
  // <Route exact path={routes.ATLETA} component={AppAtleta} />
  // <Route exact path={routes.DIRETOR} component={AppDiretor} />
  // <Route exact path={routes.TREINADOR} component={AppTreinador} />
  // <Route exact path={routes.HOME} component={AppDiretor}/>
  render() {

    return (
      <BrowserRouter>
            <Switch>
              <Route path={routes.DIRETOR} component={AppDiretor} />
              <Route path={routes.ATLETA} component={AppAtleta} />
              <Route path={routes.TREINADOR} component={AppTreinador} />
              <Route path='/Login' component={Login}/>
              <Route path='/Choose' component={Choose}/>
              <Route path='/InfoPess' component={InfoPess}/>
              <Route path='/Contactos' component={Contactos}/>
              <Route path='/Documentos' component={Documentos}/>
              <Route path='/Confirmar' component={Confirmar}/>
              <Route path='/FPA' component={FPA}/>
              <Route path='/InfoPessT' component={InfoPessT}/>
              <Route path='/ContactosT' component={ContactosT}/>
              <Route path='/DocumentosT' component={DocumentosT}/>
              <Route path='/ConfirmarT' component={ConfirmarT}/>
              <Route path='/FPAT' component={FPAT}/>
              <Route exact path='/' component={Login}/>
              <Route exact path='/' component={Choose}/>
              <Route exact path='/' component={InfoPess}/>
              <Route exact path='/' component={Contactos}/>
              <Route exact path='/' component={Documentos}/>
              <Route exact path='/' component={Confirmar}/>
              <Route exact path='/' component={FPA}/>
              <Route exact path='/' component={InfoPessT}/>
              <Route exact path='/' component={ContactosT}/>
              <Route exact path='/' component={DocumentosT}/>
              <Route exact path='/' component={ConfirmarT}/>
              <Route exact path='/' component={FPAT}/>
            </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
