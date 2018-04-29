import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import BellIcon from 'react-icons/lib/fa/bell'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './style.css'


class Notificacao extends Component{

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        popoverOpen: false,
        count: 3,
      };
    }

    toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen,
        count: 0
      });
    }




  getNotificacoes(title,data,mensagem){
    return(
    <Link to="#" className="list-group-item list-group-item-action flex-column align-items-start todo-item">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="mb-1">{title}</h6>
        <small>{data}</small>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <p className="mb-1"><small>{mensagem}</small></p>
        <span className="remove">✖</span>
      </div>
    </Link>);
  }


  render(){

    return(
      <div onClick={this.toggle}>
        <div style={{height: '10px',
          width: '36px',
          display: 'inline-block',
          margin: '0 10px',
        }}>
        <NotificationBadge count={this.state.count} style={{background:'black'}}/>
        <BellIcon id="Pr"  style={{fontSize: '26px', margin:'0 0 5px 0'}}/>
      </div>

      <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Pr" toggle={this.toggle}>
        <PopoverHeader className="text-center"><strong>Notificações</strong></PopoverHeader>
        <PopoverBody  >
          <div className="list-group" id="style-13" style={{maxHeight:'300px', overflow: 'auto'}}>
            {this.getNotificacoes("Aniversário","21/02/2018","Aniversário de José António")}
          </div>
        </PopoverBody>
      </Popover>

    </div>


  );
}
}

export default Notificacao;
