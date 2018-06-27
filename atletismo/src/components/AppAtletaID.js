import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'
import * as routes from '../constants/routes';
import NavBar from './NavBar'
import Dados from '../scenes/atleta/Dados';
import Desempenho from '../scenes/atleta/Desempenho';
import Resultados from '../scenes/atleta/Resultados';
import Fotos from '../scenes/atleta/Fotografias';
import CalendarA from '../scenes/atleta/Calendar';
import Foto from 'react-icons/lib/fa/camera';
import Performance from 'react-icons/lib/fa/line-chart';
import Calendar from 'react-icons/lib/fa/calendar';
import User from 'react-icons/lib/fa/user';
import Provas from 'react-icons/lib/fa/trophy';


class AppAtleta extends Component {
  constructor(props){
    super(props);
    this.state={
      sidebarLinks: [
        { link: `/atleta/${this.props.match.params.id}`, icon: <User className="icon" />, text: 'Dados Atleta'},
        { link: `/atleta/${this.props.match.params.id}/stats`, icon: <Performance className="icon" />, text: 'Dados Desempenho'},
        { link: `/atleta/${this.props.match.params.id}/results`, icon: <Provas className="icon" />, text: 'Resultado de Provas'},
        { link: `/atleta/${this.props.match.params.id}/photos`, icon: <Foto className="icon"/>, text: 'Galeria'},
        { link: `/atleta/${this.props.match.params.id}/calendar`, icon: <Calendar className="icon"/>, text: 'Calendário'}
      ],
    }
  }

  render() {

    const { match: { params } } = this.props;
    return (
        <div >
          <NavBar sidebarLinks={this.state.sidebarLinks} />
          <div className="content-wrapper">
            <Switch>
              <Route exact path={`/atleta/${params.id}`} component={()=> <Dados param={params.id}/>} />
              <Route exact path={`/atleta/${params.id}/results`} component={() => <Resultados param={params.id}/>} />
              <Route exact path={`/atleta/${params.id}/stats`} component={() => <Desempenho param={params.id}/>} />
              <Route exact path={`/atleta/${params.id}/photos`} component={() => <Fotos param={params.id}/>} />
              <Route exact path={`/atleta/${params.id}/calendar`} component={() => <CalendarA param={params.id}/>} />
            </Switch>
          </div>
        </div>

    );
  }
}

export default AppAtleta;
