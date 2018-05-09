import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'
import * as routes from '../constants/routes';
import NavBar from './NavBar'
import Dados from '../scenes/atleta/Dados';
import Desempenho from '../scenes/atleta/Desempenho';
import Resultados from '../scenes/atleta/Resultados';
import Fotos from '../scenes/atleta/Fotografias';
//import Video from '../scenes/atleta/';
import CalendarA from '../scenes/atleta/Calendar';
import Foto from 'react-icons/lib/fa/camera';
import Performance from 'react-icons/lib/fa/line-chart';
import Calendar from 'react-icons/lib/fa/calendar';
import Vid from 'react-icons/lib/fa/video-camera';
import User from 'react-icons/lib/fa/user';
import Provas from 'react-icons/lib/fa/trophy';


class AppAtleta extends Component {
  constructor(props){
    super(props);
    this.state={
      sidebarLinks: [
        { link: routes.ATLETA, icon: <User className="icon" />, text: 'Dados Atleta'},
        { link: routes.DESEMPENHO, icon: <Performance className="icon" />, text: 'Dados Desempenho'},
        { link: routes.RESULTADOS, icon: <Provas className="icon" />, text: 'Resultado de Provas'},
        { link: routes.FOTO, icon: <Foto className="icon"/>, text: 'Galeria'},
        { link: routes.CALENDAR, icon: <Calendar className="icon"/>, text: 'Calendário'}
      ],
    }
  }
  // <Route exact path={routes.VIDEOS} component={Video} />

  render() {
    return (
        <div >
          <NavBar sidebarLinks={this.state.sidebarLinks}/>
          <div className="content-wrapper">
            <Switch>
              <Route exact path={routes.ATLETA} component={Dados} />
              <Route exact path={routes.RESULTADOS} component={Resultados} />
              <Route exact path={routes.DESEMPENHO} component={Desempenho} />
              <Route exact path={routes.FOTO} component={Fotos} />
              <Route exact path={routes.CALENDAR} component={CalendarA} />
            </Switch>
          </div>
        </div>

    );
  }
}

export default AppAtleta;
